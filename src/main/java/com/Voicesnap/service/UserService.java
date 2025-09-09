package com.Voicesnap.service;

import com.Voicesnap.entity.User;

public interface UserService {
    User registerUser(User user);
    User findByEmail(String email);
    User login(String email, String password);
    User getUserById(Long id);        
    void resendOtp(String email);
}
