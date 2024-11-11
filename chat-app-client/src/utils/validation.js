export const validateRegistration = (formData) => {
    const { username, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
        return { isValid: false, message: 'كلمة المرور وتأكيد كلمة المرور غير متطابقين' };
    }

    if (username.length < 3) {
        return { isValid: false, message: 'الاسم يجب ان يكون اكثر من 3 حروف' };
    }

    if (!email.includes('@')) {
        return { isValid: false, message: 'البريد الالكترونى غير صحيح' };
    }

    if (password.length < 8) {
        return { isValid: false, message: 'كلمة المرور يجب ان يكون اكثر من 8 حروف' };
    }

    return { isValid: true, message: '' };
};

export const validateLogin = (values) => {
    if (!values.email || !values.password) {
        return { isValid: false, message: "Please fill in all fields" };
    }
    if (!/\S+@\S+\.\S+/.test(values.email)) {
        return { isValid: false, message: "Please enter a valid email" };
    }
    return { isValid: true };
};