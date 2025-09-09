package com.Voicesnap.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Voicesnap.dto.LoginRequest;
import com.Voicesnap.entity.User;
import com.Voicesnap.service.EmailService;
import com.Voicesnap.service.UserService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/auth")
public class UserController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private EmailService emailService;


	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody User user) {
		// Generate OTP
		String otp = String.valueOf((int) ((Math.random() * 900000) + 100000)); // 6-digit OTP
		LocalDateTime expiryTime = LocalDateTime.now().plusMinutes(10);

		user.setOtp(otp);
		user.setOtpExpiryTime(expiryTime);
		user.setVerified(false); // user not verified yet

		// Save user
		User savedUser = userService.registerUser(user);

		// Send OTP via email (you'll implement this)
		emailService.sendOtpEmail(user.getEmail(), otp); // create emailService later

		// Response
		Map<String, Object> response = new HashMap<>();
		response.put("message", "User registered successfully. Check your email for OTP.");

		return ResponseEntity.ok(response);
	}
	
	@PostMapping("/verify-otp")
	public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> payload) {
	    String email = payload.get("email");
	    String otp = payload.get("otp");

	    User user = userService.findByEmail(email);

	    if (user == null) {
	        return ResponseEntity.badRequest().body("User not found.");
	    }

	    if (user.getOtpExpiryTime().isBefore(LocalDateTime.now())) {
	        return ResponseEntity.badRequest().body("OTP expired. Please register again.");
	    }

	    if (!user.getOtp().equals(otp)) {
	        return ResponseEntity.badRequest().body("Invalid OTP.");
	    }

	    // Mark user as verified
	    user.setVerified(true);
	    user.setOtp(null); // remove OTP
	    user.setOtpExpiryTime(null);
	    userService.registerUser(user); // save changes

	    return ResponseEntity.ok("OTP verified. User account activated.");
	}
	
	@PostMapping("/resend-otp")
	public ResponseEntity<?> resendOtp(@RequestBody Map<String, String> payload) {
	    String email = payload.get("email");
	    if (email == null || email.isEmpty()) {
	        return ResponseEntity.badRequest().body("Email is required");
	    }

	    userService.resendOtp(email);
	    return ResponseEntity.ok(Map.of("message", "OTP resent successfully to "+email));
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody LoginRequest request, HttpSession session) {
	    try {
	        User user = userService.login(request.getEmail(), request.getPassword());

	        // Store userId in session for later use
	        session.setAttribute("userId", user.getId());

	        Map<String, Object> response = new HashMap<>();
	        response.put("message", "Login successful!");
	        response.put("user", user);

	        return ResponseEntity.ok(response);

	    } catch (RuntimeException ex) {
	        Map<String, String> error = new HashMap<>();
	        error.put("error", ex.getMessage());
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);

	    } catch (Exception e) {
	        Map<String, String> error = new HashMap<>();
	        error.put("error", "Internal server error");
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
	    }
	}

	
	@PostMapping("/logout")
	public ResponseEntity<?> logoutUser(HttpSession session) {
	    session.invalidate(); // clear session
	    return ResponseEntity.ok("Logged out successfully!");
	}


	@GetMapping("/user/{email}")
	public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
		User user = userService.findByEmail(email);
		return ResponseEntity.ok(user);
	}
}
