package com.power.movie_ranger.dto;

import com.power.movie_ranger.constant.Gender;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import java.time.LocalDate;

@Getter
@Setter
public class UserJoinDto {
    @NotBlank(message = "아이디를 입력해주세요.")
    private String name;

    @NotBlank(message = "이메일을 입력해주세요.")
    @Email(message = "이메일 형식으로 입력해주세요")
    private String email;

    @NotBlank(message = "비밀번호를 입력해주세요.")
    @Length(min = 8,max = 16)
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$",
            message = "숫자+영문자+특수문자 조합으로 8자리 이상 입력")
    private String password;

    @NotBlank(message = "비밀번호를 확인해주세요.")
    private String passwordConfirm;

    @NotBlank(message = "닉네임을 입력해주세요.")
    private String nickName;

    @NotBlank
    private Gender gender;

    @NotBlank(message = "생년월일을 입력해주세요.")
    private LocalDate birthDate;
}
