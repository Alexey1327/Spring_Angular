package ru.lanit.notebook.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Value("${spring.profiles.active}")
    private String profile;

    public WebSecurityConfig() {}

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {

        if (!profile.equals("production")) {
            httpSecurity.cors().configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues());
        }

        httpSecurity.csrf().disable()
                .authorizeRequests()
                .antMatchers("*", "/").permitAll();
    }
}
