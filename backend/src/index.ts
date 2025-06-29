import express from 'express';
import { PrismaClient, Role, PaymentStatus, InstructorVerificationStatus } from '../generated/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { authMiddleware } from './middleware/auth';
import cors from 'cors';
import { create } from 'domain';
// Load environment variables from .env file
dotenv.config();

// Initialize Prisma Client
const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;
// Ensure JWT_SECRET is set
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set');
}
app.use(express.json());
app.use(cors()); // Enable CORS for all routes
//(with no arguments) allows all origins, which is easy. For production,
//i may configure it to allow only specific frontend domain(s) for better security:
// const corsOptions = {
//   origin: 'http://localhost:3000', // Allow only your frontend dev server
//   optionsSuccessStatus: 200 // For legacy browser support
// };
// app.use(cors(corsOptions));

// Basic route for testing
app.get('/',(req, res) => {
  res.send('surf booking api is running');
});

// User registration endpoint
app.post('/api/auth/signup', async (req, res) =>{
  const { email, password, firstName, lastName, role} = req.body;

  if(!email || !password) {
    res.status(400).json({ error: 'Email and password are required' });
    return;
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
     res.status(400).json({ error: 'Invalid email format' });
    return;
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
       res.status(400).json({ error: 'User with that email already exists' });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create the user
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        firstName,
        lastName,
        role: role && Object.values(Role).includes(role) ? role : 'STUDENT',
      },
    });
    // If the new user is an INSTRUCTOR, create an empty InstructorProfile for them
    if (user.role === 'INSTRUCTOR') {
      await prisma.instructorProfile.create({
        data: {
          userId: user.id,
          // All other fields will take their default/nullable values
        }
      });
    }
    // Generate JWT token
    const token = jwt.sign({
      userId: user.id, role: user.role },
      JWT_SECRET, {
      expiresIn: '1h',
    });
    //Send back success response with token and user info
    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
 });

// User login endpoint
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  // basic validation
  if (!email || !password) {
     res.status(400).json({ error: 'Email and password are required'});
    return;
  }
  try{
    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }
    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }
    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    // Send back success response with token and user info
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      token,
    });
  }catch (error) {
    console.error('Error during user login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Protected route example
app.get('/api/protected', authMiddleware, (req, res) => {
  // This route is protected by the authMiddleware
  // If the user is authenticated, their userID and role will be available in req.userID and req.role
  res.status(200).json({
    message: `Welcome, user ${req.userID}! Your role is ${req.role}. You accessed a protected route.`,
    userId: req.userID,
    role: req.role,
  });
});

// get user own profile info
app.get('/api/users/me', authMiddleware, async (req, res) => {
  try {
    // Find the user by ID from the request
    const user = await prisma.user.findUnique({
      where: { id: req.userID },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) {
       res.status(404).json({ error: 'User not found' });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal server error fetching user profile.' });
  }
});

// Update user profile info
app.put('/api/users/me', authMiddleware, async (req, res) => {
  try {
    const userId = req.userID;
    const { firstName, lastName, phoneNumber } = req.body;
    // Validate input
    if (!firstName && !lastName && !phoneNumber) {
      res.status(400).json({ error: 'At least one field (firstName, lastName, phoneNumber) is required for update.' });
      return;
    }
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName: firstName || undefined, // Allow firstName to be optional
        lastName: lastName || undefined, // Allow lastName to be optional
        phoneNumber: phoneNumber || undefined, // Allow phoneNumber to be optional
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        role: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.status(200).json({
      message: 'User profile updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Internal server error updating user profile.' });
  }
});
// get all instructors' profiles
app.get('/api/instructors', async (req, res) => {
  try{
     const instructors = await prisma.instructorProfile.findMany({
       where:{
          verificationStatus: 'VERIFIED', // Only return verified instructors
       },
       include: {
        user: { // Include user data
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
       },
        orderBy: {
           averageRating: 'desc', // Order by average rating, highest first
        },
      });
    res.status(200).json(instructors);
  }catch (error) {
    console.error('Error fetching instructors:', error);
    res.status(500).json({ error: 'Internal server error fetching instructors.' });
  }
});
//get instructor's profile by anyone
app.get('/api/instructors/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // fetch instructor profile and user data
    const instructorProfile = await prisma.instructorProfile.findUnique({
      where: { userId: id },
      include: {
        user: { // Include user data
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phoneNumber: true,
            isVerified: true,
          },
        },
        availabilities: {
          select: {
            id: true,
            dayOfWeek: true,
            startTime: true,
            endTime: true,
            price: true,
            isBooked: true,
            durationMinutes: true,
            isRecurring: true,
          },
          where: {
            isBooked: false, // Only return available slots
            startTime: {
              gte: new Date(), // Only return slots that are in the future
            },
          },
          orderBy: {
            startTime: 'asc', // Order by start time
          },
        }
      },
    });
    if (!instructorProfile) {
      res.status(404).json({ error: 'Instructor profile not found' });
      return;
    }
    if(instructorProfile.verificationStatus !== 'VERIFIED') {

      // For now, let's allow viewing basic info even if not verified,
      // but you might want to restrict this more in a production app (e.g., only show if VERIFIED)
      // Or only allow admins to view unverified profiles

    }
    res.status(200).json(instructorProfile);
  } catch (error) {
    console.error('Error fetching instructor profile:', error);
    res.status(500).json({ error: 'Internal server error fetching instructor profile.' });
  }
});
// update instructor profile by instructor themselves
app.put('/api/instructors/me', authMiddleware, async (req, res) => {
  try{
    const userId = req.userID;
    const role = req.role;
    if (role !== 'INSTRUCTOR') {
       res.status(403).json({ error: 'Forbidden: Only instructors can update their profile.' });
      return;
    }
    const instructorProfile = await prisma.instructorProfile.findUnique({
      where: { userId },
    });
    if (!instructorProfile) {
       res.status(404).json({ error: 'Instructor profile not found' });
      return;
    }
    const{
      birthDate,
      country,
      city,
      zipCode,
      beachlocation,
      certification,
      bio,
      languages,
      portraitPictureUrl,
      portfolioImageUrls,
      levelToTeach
    }= req.body;
    const updateData: {[key: string]: any} = {};
    if(birthDate !== undefined) updateData.birthDate = new Date(birthDate);
    if(country !== undefined) updateData.country = country;
    if(city !== undefined) updateData.city = city;
    if(zipCode !== undefined) updateData.zipCode = zipCode;
    if(beachlocation !== undefined) updateData.beachlocation = beachlocation;
    if(certification !== undefined) updateData.certification = certification;
    if(bio !== undefined) updateData.bio = bio;
    if(languages !== undefined) updateData.languages = languages;
    if (portraitPictureUrl !== undefined) updateData.portraitPictureUrl = portraitPictureUrl;
    if (portfolioImageUrls !== undefined) updateData.portfolio = portfolioImageUrls;
    if (levelToTeach !== undefined) updateData.levelToTeach = levelToTeach;

    if (Object.keys(updateData).length === 0) {
      res.status(400).json({ error: 'No fields to update' });
      return;
    }
    // Update the instructor profile
    const updatedProfile = await prisma.instructorProfile.update({
      where: { userId },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phoneNumber: true,
            isVerified: true,
          },
        },
      },
    });
    res.status(200).json({
      message: 'Instructor profile updated successfully',
      profile: updatedProfile,
    });
  } catch (error) {
    console.error('Error updating instructor profile:', error);
    res.status(500).json({ error: 'Internal server error updating instructor profile.' });
  }
});
//add availability for instructor
app.post('/api/instructors/availabilities', authMiddleware, async (req, res) => {
   try{
      const userId = req.userID;
      const role = req.role;
      if (role !== 'INSTRUCTOR') {
        res.status(403).json({ error: 'Forbidden: Only instructors can add availability.' });
        return;
      }
      const instructorProfile = await prisma.instructorProfile.findUnique({
        where: { userId },
        select: { id: true },
      });
      if (!instructorProfile) {
        res.status(404).json({ error: 'Instructor profile not found' });
        return;
      }
      const availabilitiesData = Array.isArray(req.body) ? req.body : [req.body];
      const createdAvailabilities = [];
      for (const data of availabilitiesData) {
        const{startTime, endTime, dayOfWeek, price, durationMinutes, isRecurring} = data;
        // Validate required fields
        if (!startTime || !endTime || !dayOfWeek || !price ) {
          res.status(400).json({ error: 'startTime, endTime, dayOfWeek, and price are required' });
          return;
        }
        // Validate time format
        const start = new Date(startTime);
        const end = new Date(endTime);
        if (isNaN(start.getTime()) || isNaN(end.getTime()) || start >= end) {
          res.status(400).json({ error: 'Invalid startTime or endTime provided.' });
          return;
        }
        if(start < new Date()) {
          res.status(400).json({ error: 'startTime must be in the future.' });
          return;
        }
        // validate dayOfWeek and isRecurring
        if(isRecurring && (dayOfWeek === undefined || dayOfWeek < 0 || dayOfWeek > 6)) {
          res.status(400).json({ error: 'dayOfWeek must be between 0 (Sunday) and 6 (Saturday) for recurring availability.' });
          return;
        }
        if(!isRecurring && dayOfWeek !== undefined) {
          res.status(400).json({ error: 'dayOfWeek should not be provided for non-recurring availability.' });
          return;
        }
        if(isRecurring && start.getDay() !== dayOfWeek) {
          res.status(400).json({ error: 'startTime must match the specified dayOfWeek for recurring availability.' });
          return;
        }
        // Create the availability
        const availability = await prisma.availability.create({
          data: {
            instructorId: instructorProfile.id,
            startTime: start,
            endTime: end,
            dayOfWeek: isRecurring ? parseInt(dayOfWeek) : null, // Only set for recurring
            price: parseFloat(price),
            durationMinutes: durationMinutes || 60, // Default to 60 minutes if not provided
            isRecurring: isRecurring || false, // Default to false if not provided
            isBooked: false, // New availability slots are not booked by default
          },
        });
        createdAvailabilities.push(availability);
     }
      res.status(201).json({
        message: 'Availability created successfully',
        availabilities: createdAvailabilities,
      });
    } catch (error) {
      console.error('Error creating availability:', error);
      res.status(500).json({ error: 'Internal server error creating availability.' });
    }
});
// create a booking for an availability
app.post('/api/bookings', authMiddleware, async (req, res) => {
  try{
    const studentId = req.userID;
    const role = req.role;
    // Validate that the user is a student
    if (role !== 'STUDENT') {
      res.status(403).json({ error: 'Forbidden: Only students can create bookings.' });
      return;
    }
    const{
      instructorId,
      availabilityId,
      bookedPrice,
      bookedDurationMinutes,
      location,
      equipmentIncluded,
      bookingType = 'INDIVIDUAL', // Default to INDIVIDUAL if not provided
      numberOfStudents = 1, // Default to 1 if not provided
      studentNotes
    }= req.body;
    // Validate required fields
    if (!instructorId || !availabilityId || bookedPrice === undefined || !location) {
      res.status(400).json({ error: 'instructorId, availabilityId, bookedPrice, and location are required' });
      return;
    }
    if(bookingType === 'GROUP' && (numberOfStudents < 2 || numberOfStudents > 10)) {
      res.status(400).json({ error: 'For GROUP bookings, numberOfStudents must be between 2 and 10' });
      return;
    }
    if (bookingType !== 'INDIVIDUAL' && numberOfStudents !== 1) {
      res.status(400).json({ error: 'For INDIVIDUAL bookings, numberOfStudents must be 1' });
      return;
    }
    const result = await prisma.$transaction(async (tx) => {
      // Check if the availability exists and is not booked
      const availability = await tx.availability.findUnique({
        where: { id: availabilityId },
        include: { instructor: true, booking: true},
      });

      if (!availability) {
        res.status(404).json({ error: 'Availability not found' });
        return;
      }
      if(availability.instructorId !== instructorId) {
        res.status(403).json({ error: 'Forbidden: This availability does not belong to the specified instructor.' });
        return;
      }
      if (availability.isBooked || availability.bookingId) {
        res.status(400).json({ error: 'This availability slot is already booked' });
        return;
      }
      if (availability.startTime < new Date()) {
        res.status(400).json({ error: 'Cannot book an availability slot in the past' });
        return;
      }

      // Create the booking
      const booking = await tx.booking.create({
        data: {
          studentId: studentId as string,
          instructorId,
          availabilityId,
          bookedPrice: parseFloat(bookedPrice),
          bookedDurationMinutes: bookedDurationMinutes ? parseInt(bookedDurationMinutes) : null,
          location,
          equipmentIncluded: equipmentIncluded || false, // Default to false if not provided
          bookingType: bookingType || 'INDIVIDUAL', // Default to INDIVIDUAL if not provided
          numberOfStudents: bookingType === 'GROUP' ? numberOfStudents : 1, // Only set for GROUP bookings
          studentNotes: studentNotes || null, // Allow studentNotes to be optional
          status: 'PENDING', // Set to PENDING initially
          payment: {
            create: {
              amount: parseFloat(bookedPrice),
              status: 'PENDING', // Set to PENDING initially
            }
          }
        },include: { payment: true,} // Include the payment in the response
      });

      // Update the availability to mark it as booked
      await tx.availability.update({
        where: { id: availabilityId },
        data: {
          isBooked: true,
          bookingId: booking.id, // Link the booking to the availability
        },
      });
      // Return the created booking and payment
      return {booking, payment: booking.payment};
    });
    if (!result) {
      res.status(500).json({ error: 'Failed to create booking' });
      return;
    }
    res.status(201).json({
      message: 'Booking created successfully',
      booking: result.booking,
      payment: result.payment,
    });
  }catch (error: any) {
    console.error('Error creating booking:', error);
    if(error.message.include('Availability slot')){
      res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Internal server error creating booking.' });
  }
});
// get bookings for a student
app.get('/api/bookings/my-bookings', authMiddleware, async (req, res) => {
  try {
        const studentId = req.userID;
        const role = req.role;
        if (role !== 'STUDENT' && role !== 'ADMIN') {// admin can also view bookings for debugging/support purposes
          res.status(403).json({ error: 'Forbidden: Only students can view bookings.' });
          return;
        }
        const bookings = await prisma.booking.findMany({
          where: { studentId: studentId },
          include:{
            instructor: {
              select: {
                id: true,
                beachLocation: true,
                user: {
                  select: {
                    firstName: true,
                    lastName: true,
                    phoneNumber: true,
                  },
                },
              },
            },
            availability: {
              select:{
                startTime: true,
                endTime: true,
                dayOfWeek: true,
                durationMinutes: true,
                price: true,
              }
            },
            payment:{
              select: {
                amount: true,
                status: true,
                transactionDate: true,
              },
            }
          },
          orderBy: {
            createdAt: 'desc', // Order by creation date, most recent first
          },
        });
        res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Internal server error fetching student bookings.' });
  }
});
// get bookings for an instructor
app.get('/api/bookings/instructor-bookings', authMiddleware, async (req, res) => {
  try {
    const userId = req.userID;
    const role = req.role;
    if (role !== 'INSTRUCTOR' && role !== 'ADMIN') { // admin can also view bookings for debugging/support purposes
      res.status(403).json({ error: 'Forbidden: Only instructors can view their bookings.' });
      return;
    }
    // Find the instructor profile to get the instructorId
    const instructorProfile = await prisma.instructorProfile.findUnique({
      where: { userId },
      select: { id: true },
    });
    if (!instructorProfile) {
      res.status(404).json({ error: 'Instructor profile not found' });
      return;
    }
    const bookings = await prisma.booking.findMany({
      where: { instructorId: instructorProfile.id },
      include:{
        student: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phoneNumber: true,
          },
        },
        availability: {
          select:{
            startTime: true,
            endTime: true,
            dayOfWeek: true,
            durationMinutes: true,
            price: true,
          }
        },
        payment:{
          select: {
            amount: true,
            status: true,
            transactionDate: true,
          },
        }
      },
      orderBy: {
        createdAt: 'desc', // Order by creation date, most recent first
      },
    });
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching instructor bookings:', error);
    res.status(500).json({ error: 'Internal server error fetching instructor bookings.' });
  }
});
// For MVP, we'll allow ADMIN to do this. In production, this would be triggered by a payment gateway webhook.
app.put('/api/payments/:id/status', authMiddleware, async (req, res) => {
  try{
      const { id } = req.params;
      const role = req.role;
      const {status} = req.body;
      // Validate that the user is an ADMIN
      if (role !== 'ADMIN') {
        res.status(403).json({ error: 'Forbidden: Only admins can update payment status.' });
        return;
      }
      // Validate status
    if (!status || !Object.values(PaymentStatus).includes(status)) {
        res.status(400).json({ error: `Invalid payment status. Must be one of: ${Object.values(PaymentStatus).join(', ')}` });
        return;
    }
    const result = await prisma.$transaction(async (tx) => {
      // find payment by bookingId
      const payment = await tx.payment.findUnique({
        where: { id: id },
        select: {id: true, bookingId: true},
      });
      if (!payment || !payment.bookingId) {
        res.status(404).json({ error: 'Payment not found for the specified booking.' });
        return;
      }
      // Update the payment status
      const updatedPayment = await tx.payment.update({
        where: { id: payment.id },
        data: { status: status },
      });
      // If the payment is successful, update the booking status
      let newBookingStatus: 'CONFIRMED' | 'CANCELLED' | 'PENDING' | 'COMPLETED' | 'REFUNDED';
      switch (status) {
        case 'COMPLETED':
          newBookingStatus = 'CONFIRMED';
          break;
        case 'FAILED':
          newBookingStatus = 'CANCELLED';
          break;
        case 'REFUNDED':
          newBookingStatus = 'REFUNDED';
          break;
        case 'PENDING':
          newBookingStatus = 'PENDING';
          break;
        default:
          newBookingStatus = 'PENDING'; // Default to PENDING if status is not recognized
      }
      const updatedBooking = await tx.booking.update({
        where: { id: payment.bookingId },
        data: { status: newBookingStatus },
      });
      return { updatedPayment, updatedBooking };
    });
    if (!result || !result.updatedPayment || !result.updatedBooking) {
      res.status(500).json({ error: 'Failed to update payment status' });
      return;
    }
    res.status(200).json({
      message: 'Payment status updated successfully',
      payment: result.updatedPayment,
      booking: result.updatedBooking,
    });
  }catch (error: any) {
    console.error('Error updating payment status:', error);
    if(error.message.includes('Payment Record') || error.message.includes('payment not linked to a booking')){
      res.status(404).json({ error: error.message });
    };
    res.status(500).json({ error: 'Internal server error updating payment status.' });
  }
});
// Create a review for a booking
app.post('/api/reviews', authMiddleware, async (req, res) => {
  try {
    const { studentId, instructorId, bookingId, rating, comment } = req.body;
    const userId = req.userID;
    const role = req.role;

    // 1. Authorization: Only STUDENTS can create reviews, and only for themselves
    if (role !== 'STUDENT' || userId !== studentId) {
       res.status(403).json({ message: 'Access denied. Only students can create reviews for their own bookings.' });
      return;
    }

    // 2. Validate input
    if (!studentId || !instructorId || !bookingId || typeof rating !== 'number' || rating < 1 || rating > 5) {
       res.status(400).json({ message: 'Missing required fields or invalid rating (must be 1-5).' });
      return;
    }

    // 3. Verify booking ownership and status, and check if already reviewed
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { review: true }, // Include existing review if any
    });

    if (!booking || booking.studentId !== studentId || booking.instructorId !== instructorId) {
       res.status(404).json({ message: 'Booking not found or does not belong to this student/instructor combination.' });
      return;
    }

    if (booking.status !== 'COMPLETED' && booking.status !== 'CONFIRMED') { // Assuming reviews only for completed/confirmed bookings
       res.status(400).json({ message: 'Booking must be completed or confirmed to be reviewed.' });
      return;
    }

    if (booking.review) {
       res.status(409).json({ message: 'This booking has already been reviewed.' });
      return;
    }

    // Use a transaction for atomicity: create review AND update instructor profile
    const newReview = await prisma.$transaction(async (tx) => {
      // Create the review
      const createdReview = await tx.review.create({
        data: {
          studentId,
          instructorId,
          bookingId,
          rating,
          comment,
        },
      });

      // --- Recalculate and update instructor's average rating and total reviews ---
      const allInstructorReviews = await tx.review.findMany({
        where: { instructorId: instructorId },
        select: { rating: true },
      });

      const totalRatings = allInstructorReviews.reduce((sum, review) => sum + review.rating, 0);
      const newTotalReviews = allInstructorReviews.length;
      const newAverageRating = newTotalReviews > 0 ? parseFloat((totalRatings / newTotalReviews).toFixed(1)) : 0.0;

      await tx.instructorProfile.update({
        where: { id: instructorId },
        data: {
          averageRating: newAverageRating,
          totalReviews: newTotalReviews,
        },
      });
      return createdReview;
    });

    res.status(201).json({ message: 'Review submitted successfully!', review: newReview });

  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Server error submitting review.', details: (error as Error).message });
  }
});
// Get reviews for instructors
app.get('/api/reviews/instructor/:instructorId', async (req, res) => {
  try{
    const { instructorId } = req.params;
    // Validate instructorId
    const instructor = await prisma.instructorProfile.findUnique({
      where: { id: instructorId },
      select: { id: true },
    });
    if (!instructor) {
      res.status(404).json({ error: 'Instructor not found' });
      return;
    }
    const reviews = await prisma.review.findMany({
      where: { instructorId },
      include:{
        student: { // Include basic student info
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        booking: {// include basic booking info
          select: {
            id: true,
            status: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc', // Order by creation date, most recent first
      },
    });
  }catch (error) {
    console.error('Error fetching instructor reviews:', error);
    res.status(500).json({ error: 'Internal server error fetching instructor reviews.' });
  }
});
// Get reviews for student
app.get('/api/reviews/my-reviews', authMiddleware, async (req, res) => {
  try {
      const studentId = req.userID;
      const role = req.role;
      if (role !== 'STUDENT' && role !== 'ADMIN') { // admin can also view reviews for debugging/support purposes
        res.status(403).json({ error: 'Forbidden: Only students can view their reviews.' });
        return;
      }
      const reviews = await prisma.review.findMany({
        where: { studentId: studentId },
        include: {
          instructor: { // Include basic instructor info
            select: {
              id: true,
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                },
              },
              beachLocation: true,
            },
          },
          booking: { // Include basic booking info
            select: {
              id: true,
              status: true,
              location: true,
              availability: {
                select: {
                  startTime: true,
                  endTime: true,
                },
            },
          },
        },
      },
        orderBy: {
          createdAt: 'desc', // Order by creation date, most recent first
        },
      });
      res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching student reviews:', error);
    res.status(500).json({ error: 'Internal server error fetching student reviews.' });
  }
});
// Get all users (for admin purposes)
app.get('/api/admin/users', authMiddleware, async (req, res) => {
  try {
    const role = req.role;
    // Validate that the user is an ADMIN
    if (role !== 'ADMIN') {
      res.status(403).json({ error: 'Forbidden: Only admins can view all users.' });
      return;
    }
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
        instructorProfile: {
          select: {
            id: true,
            beachLocation: true,
            portraitPictureUrl: true,
            verificationStatus: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc', // Order by creation date, most recent first
      },
    });
    res.status(200).json(users);
  }catch (error) {
    console.error('Error fetching all users:', error);
    res.status(500).json({ error: 'Internal server error fetching all users.' });
  }
});
//update instructor verification status (for admin purposes)
app.put('/api/admin/instructors/:id/verification', authMiddleware, async (req, res) => {
  try {
     const { id } = req.params;
     const role = req.role;
     const { verificationStatus } = req.body;
     if (role !== 'ADMIN') {
       res.status(403).json({ error: 'Forbidden: Only admins can update instructor verification status.' });
       return;
      }
      // Validate verificationStatus
     if (!verificationStatus || !Object.values(InstructorVerificationStatus).includes(verificationStatus)) {
        res.status(400).json({ error: `Invalid verification status. Must be one of: ${Object.values(InstructorVerificationStatus).join(', ')}` });
        return;
      }
      const updatedProfile = await prisma.instructorProfile.update({
        where: { id: id },
        data: { verificationStatus: verificationStatus },
        select: {
          id: true,
          userId: true,
          verificationStatus: true,
          user: {
            select: {
              email: true,
              firstName: true,
              lastName: true,
              role: true,
              isVerified: true,
            },
          },
          updatedAt: true,
        },
      });
      res.status(200).json({
        message: `Instructor ${updatedProfile.user?.firstName || 'N/A'} ${updatedProfile.user?.lastName || 'N/A'}'s verification status updated to ${updatedProfile.verificationStatus} successfully!`,
        instructor: updatedProfile,
      });
    } catch (error:any) {
      console.error('Error updating instructor verification status:', error);
      if (error.message.includes('No InstructorProfile found')) {
        res.status(404).json({ error: 'Instructor profile not found for the specified user.' });
      }
        res.status(500).json({ error: 'Internal server error updating instructor verification status.' });
    }
  });
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Handle graceful shutdown
process.on('beforeExit', async () => {
    await prisma.$disconnect();
    console.log('Prisma disconnected');
});
