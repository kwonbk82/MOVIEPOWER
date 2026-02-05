package com.power.movie_ranger.config.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration      //스프링의 설정파일을 의미
@EnableWebSecurity  //스프링 시큐리티를 활성화하는 어노테이션
public class SecurityConfig {

    //SecurityFilterChain을 반환하는 Bean 객체를 생성
    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        //authorizeHttpRequests : 요청에 대한 인가를 설정
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                .csrf(csrf -> csrf
                        .disable())

                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/**").permitAll()
                );
//            .formLogin(form -> form.disable());
        return http.build();
    }

//    외부 포트 허용 설정
//    리액트에서 스프링으로 API를 전송할 때 차단을 방지
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:5173"));
        //허용할 요청 방식
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        //모든 헤더 정보를 신뢰하도록 설정
        config.setAllowedHeaders(List.of("*"));
        //세션과 쿠키를 주고받기 위해 설정
        config.setAllowCredentials(true);

        //모든 요청에 대해서 CORS 정책을 허용하도록 함
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
