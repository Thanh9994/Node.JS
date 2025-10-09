im

export const authorAddSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    "string.base": "Tên tác giả phải là chuỗi ký tự",
    "string.empty": "Tên tác giả không được để trống",
    "string.min": "Tên tác giả phải có ít nhất {#limit} ký tự",
    "string.max": "Tên tác giả không được vượt quá {#limit} ký tự",
    "any.required": "Tên tác giả là bắt buộc"
  }),
  bio: Joi.string().max(500).messages({
    "string.base": "Thông tin tác giả phải là chuỗi ký tự",
    "string.max": "Thông tin tác giả không được vượt quá {#limit} ký tự"
  })
});

export const authorUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(100).messages({
    "string.base": "Tên tác giả phải là chuỗi ký tự",
    "string.empty": "Tên tác giả không được để trống",
    "string.min": "Tên tác giả phải có ít nhất {#limit} ký tự",
    "string.max": "Tên tác giả không được vượt quá {#limit} ký tự"
    }),
  bio: Joi.string().max(500).messages({
    "string.base": "Thông tin tác giả phải là chuỗi ký tự",
    "string.max": "Thông tin tác giả không được vượt quá {#limit} ký tự"
  })
});


