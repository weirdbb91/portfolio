package com.community.lamb.service;

import com.community.lamb.model.Role;
import com.community.lamb.model.User;
import com.community.lamb.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User save(User user) {
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        user.setEnabled(1);
        Role role = new Role();
        role.setId(1L);
        user.getRoles().add(role);
        return userRepository.save(user);
    }
}
