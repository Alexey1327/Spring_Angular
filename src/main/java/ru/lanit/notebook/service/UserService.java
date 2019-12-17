package ru.lanit.notebook.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.lanit.notebook.dto.UserDto;
import ru.lanit.notebook.entity.User;
import ru.lanit.notebook.repository.UserRepositoryInterface;

@Service
public class UserService {
    private final UserRepositoryInterface userRepository;
    private final PasswordEncoder bcryptEncoder;

    public UserService(UserRepositoryInterface userRepository, PasswordEncoder bcryptEncoder) {
        this.userRepository = userRepository;
        this.bcryptEncoder = bcryptEncoder;
    }

    public User register(UserDto userDto) {
        User user = new User(userDto.getUsername(), bcryptEncoder.encode(userDto.getPassword()));

        return userRepository.save(user);
    }
}