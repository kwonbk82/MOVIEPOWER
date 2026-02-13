package com.power.movie_ranger.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class LoginRequestDto {
    private String email;

    private String password;
}
