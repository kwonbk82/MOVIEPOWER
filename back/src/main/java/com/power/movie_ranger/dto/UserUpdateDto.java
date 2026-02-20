package com.power.movie_ranger.dto;

import com.power.movie_ranger.constant.Gender;
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
public class UserUpdateDto {

    private String name;


    @Length(min = 8,max = 16)
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$",
            message = "숫자+영문자+특수문자 조합으로 8자리 이상 입력")
    private String password;


    private String nickName;


    private Gender gender;


    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthDate;
}
