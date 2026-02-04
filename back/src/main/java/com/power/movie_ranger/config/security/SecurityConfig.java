package com.power.movie_ranger.config.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration      //스프링의 설정파일을 의미
@EnableWebSecurity  //스프링 시큐리티를 활성화하는 어노테이션
public class SecurityConfig {

    //SecurityFilterChain을 반환하는 Bean 객체를 생성
    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        //authorizeHttpRequests : 요청에 대한 인가를 설정
        http

                .csrf(csrf -> csrf
                        .disable())

                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/**").permitAll()
                );
        return http.build();
    }
    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
