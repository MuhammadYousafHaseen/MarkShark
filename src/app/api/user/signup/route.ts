import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const {
      name,
      email,
      password,
      image,
      phone,
      address,
      city,
      country,
      state,
      isAdmin,
    } = await request.json();

    if (!name || !email || !password || !phone || !address) {
      return Response.json(
        {
          success: false,
          message: "Please fill all the required fields",
        },
        {
          status: 400,
        }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json(
        {
          success: false,
          message: "User already exists",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      image: image || "",
      phone,
      address,
      city: city || "",
      country: country || "",
      state: state || "",
      isAdmin: isAdmin || false,
    });

    return Response.json(
      {
        success: true,
        message: "User registered successfully",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          image: newUser.image,
          phone: newUser.phone,
          address: newUser.address,
          city: newUser.city,
          country: newUser.country,
          state: newUser.state,
          isAdmin: newUser.isAdmin,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error signing up:", error);
    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      {
        status: 500,
      }
    );
  }
}
