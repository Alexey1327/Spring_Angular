package ru.lanit.notebook.web.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import ru.lanit.notebook.auth.JwtTokenUtil;
import ru.lanit.notebook.dto.UserDto;
import ru.lanit.notebook.entity.User;
import ru.lanit.notebook.request.JwtRequest;
import ru.lanit.notebook.service.JwtUserDetailsService;
import ru.lanit.notebook.service.UserService;

@RestController
@CrossOrigin
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final JwtUserDetailsService userDetailsService;
    private final UserService userService;

    public AuthController(
            AuthenticationManager authenticationManager,
            JwtTokenUtil jwtTokenUtil,
            JwtUserDetailsService userDetailsService,
            UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.userDetailsService = userDetailsService;
        this.userService = userService;
    }

    @PostMapping("/api/authenticate")
    public ResponseEntity createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
        try {
            authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
        } catch (Exception e) {
            if (e.getCause() instanceof BadCredentialsException) {
                try {
                    userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
                    return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
                } catch (UsernameNotFoundException u) {
                    // register user
                    this.userService.register(new UserDto(authenticationRequest.getUsername(), authenticationRequest.getPassword()));
                    authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
                }
            }
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        final String token = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(token);
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
}