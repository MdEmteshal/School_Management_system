import jwt from "jsonwebtoken"

export const genrateToken = (userId) => {
  try {
    console.log("generateToken function JWT SECRET :", process.env.JWT_SECRET_KEY);
    console.log("generateToken function UserId :", userId);
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" })
    return token
  } catch (error) {
    console.log(`Token error ${error}`)
  }
}