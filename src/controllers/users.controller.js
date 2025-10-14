
import User from "../models/users.models.js";

export const signUp = async (req, res) => {
    const { username, password, email, role  } = req.body;

    try {
        const newUser = await User.create({ username, password, email, role });
        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: "Sai username hoặc password" });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const getAll = async (res, req) => {
    try{
        const user = await User.find();
        return res.json(user)
    } catch (err) {
      res.status(500).json({ message: "Lỗi server", error: err.message });
    }
}