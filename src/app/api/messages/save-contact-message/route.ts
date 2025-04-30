import dbConnect from "@/lib/dbConnect";
import Message from "@/models/message.model";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return Response.json(
        {
          success: false,
          message: "Please fill all the fields",
        },
        { status: 400 }
      );
    }

    const newMessage = await Message.create({
      senderName: name,
      senderEmail: email,
      message,
    });

    return Response.json(
      {
        success: true,
        message: "Message sent successfully",
        data: {
          id: newMessage._id,
          name: newMessage.senderName,
          email: newMessage.senderEmail,
          message: newMessage.message,
          createdAt: newMessage.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error Sending Message:", error);
    return Response.json(
      {
        success: false,
        message: "Error sending message",
      },
      { status: 500 }
    );
  }
}
