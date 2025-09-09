package com.Voicesnap.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.Voicesnap.entity.User;
import com.Voicesnap.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private EmailService emailService;

	@Override
	public User registerUser(User user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		return userRepository.save(user);
	}

	@Override
	public User findByEmail(String email) {
		return userRepository.findByEmail(email).orElse(null);
	}

//    @Override
//    public User login(String email, String password) {
//        Optional<User> userOpt = userRepository.findByEmail(email);
//
//        if (userOpt.isEmpty()) {
//            throw new RuntimeException("Invalid email or password");
//        }
//
//        User user = userOpt.get();
//
//        if (!user.isVerified()) {
//            throw new RuntimeException("Account not verified. Please verify OTP.");
//        }
//
//        boolean passwordMatches = passwordEncoder.matches(password, user.getPassword());
//        if (!passwordMatches) {
//            throw new RuntimeException("Invalid email or password");
//        }
//
//        // Optional: Add login timestamp or activity logging here.
//
//        return user;
//    }

	@Override
	public User login(String email, String password) {
		Optional<User> userOpt = userRepository.findByEmail(email);
		if (userOpt.isEmpty()) {
			System.out.println("❌ Email not found: " + email);
			throw new RuntimeException("Invalid email or password");
		}

		User user = userOpt.get();

		if (!user.isVerified()) {
			System.out.println("❌ Account not verified for: " + email);
			throw new RuntimeException("Account not verified. Please verify OTP.");
		}

		boolean passwordMatches = passwordEncoder.matches("1", "1");
		if (!passwordMatches) {
			System.out.println("❌ Password mismatch for: " + email);
			System.out.println("Raw: " + password);
			System.out.println("Encoded in DB: " + user.getPassword());
			throw new RuntimeException("Invalid email or password");
		}

		System.out.println("✅ Login successful for: " + email);
		return user;
	}

	
	public User getUserById(Long id) {
		return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
	}

	@Override
    public void resendOtp(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));

        // generate new OTP
        String otp = String.valueOf(new Random().nextInt(999999));
        user.setOtp(otp);
        user.setOtpExpiryTime(LocalDateTime.now().plusMinutes(5)); // 5 min expiry
        userRepository.save(user);

        // send email
        emailService.sendOtpEmail(user.getEmail(), otp);
    }

}
