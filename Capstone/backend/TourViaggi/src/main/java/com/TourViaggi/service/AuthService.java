package com.TourViaggi.service;

import com.TourViaggi.entity.User;
import com.TourViaggi.payload.LoginDto;
import com.TourViaggi.payload.RegisterDto;

public interface AuthService {
    
	String login(LoginDto loginDto);
    String register(RegisterDto registerDto);
    
}
