package com.power.movie_ranger.dto;

import com.power.movie_ranger.constant.Gender;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Getter
@Setter
public class UserJoinDto {
    @NotBlank
    private String name;

    @NotBlank
    @Email(message = "이메일 형식으로 입력해주세요")
    private String email;

    @NotBlank
    @Length(min = 8,max = 16)
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$",
            message = "숫자+영문자+특수문자 조합으로 8자리 이상 입력")
    private String password;

    @NotBlank
    private String nickName;

    @NotNull
    private Gender gender;

    @NotNull
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthDate;
}
