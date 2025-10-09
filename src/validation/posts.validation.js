import Joi from 'joi';

export const validateAddSchema = Joi.object({
    title: Joi.string() .required() .min(3) .max(100).messages({
        "string.base": "Tiêu đề phải là chuỗi ký tự",
        "string.empty": "Tiêu đề không được để trống",
        "string.max": "Tiêu đề phải có ít nhất {#limit} ký tự",
        "any.required": "Tiêu đề là bắt buộc"
    }),
    content: Joi.string() .required() .min(10) .max(5000) .messages( {
        "string.base": "Nội dung phải là chuỗi ký tự",
        "string.empty": "Nội dung không được để trống",
        "string.min": "Nội dung phải có ít nhất {#limit} ký tự",
        "string.max": "Nội dung không được vượt quá {#limit} ký tự",
        "any.required": "Nội dung là bắt buộc"
    }),
    isPublished: Joi.boolean().optional()
});

export const validateUpdateSchema = Joi.object({
    title: Joi.string() .optional() .min(3) .max(100).messages({
        "string.base": "Tiêu đề phải là chuỗi ký tự",
        "string.empty": "Tiêu đề không được để trống",
        "string.max": "Tiêu đề phải có ít nhất {#limit} ký tự",
        "any.required": "Tiêu đề là bắt buộc"
    }),
    content: Joi.string() .optional() .min(10) .max(5000) .messages( {
        "string.base": "Nội dung phải là chuỗi ký tự",
        "string.empty": "Nội dung không được để trống",
        "string.min": "Nội dung phải có ít nhất {#limit} ký tự",
        "string.max": "Nội dung không được vượt quá {#limit} ký tự",
        "any.required": "Nội dung là bắt buộc"
    }),
    isPublished: Joi.boolean().optional()
});
