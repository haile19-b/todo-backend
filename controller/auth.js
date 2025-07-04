import { ClerkExpressRequireAuth, ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';

// ✅ Get authenticated user (for protected routes)
export const getAuthUser = async (req, res) => {
  try {
    const { userId } = req.auth; // From Clerk middleware
    
    // Optional: Fetch additional user data from your DB
    // const userData = await User.findOne({ clerkUserId: userId });
    
    res.status(200).json({ 
      userId,
      // ...userData?._doc 
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};