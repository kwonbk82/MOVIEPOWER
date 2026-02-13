package com.power.movie_ranger.entity;

import com.power.movie_ranger.constant.Gender;
import com.power.movie_ranger.constant.Role;
import com.power.movie_ranger.dto.UserJoinDto;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@ToString
@Table(name="tb_user")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseTimeEntity{
    @Id
    @Column(name="user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true,nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(unique = true,nullable = false)
    private String nickName;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(nullable = false)
    private LocalDate birthDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false,length = 10)
    private Role role;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Inquiry> inquiries = new ArrayList<>();

    public static User createUser(UserJoinDto dto, PasswordEncoder pe){
        User user = new User();
        user.name = dto.getName();
        user.email = dto.getEmail();
        user.password = pe.encode(dto.getPassword());
        user.nickName = dto.getNickName();
        user.gender = dto.getGender();
        user.birthDate = dto.getBirthDate();
        if ("admin@movie.com".equals(dto.getEmail())) {
            user.role = Role.ADMIN;
        } else {
            user.role = Role.USER;
        }
        return user;
    }
}
