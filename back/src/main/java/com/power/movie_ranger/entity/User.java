package com.power.movie_ranger.entity;

import com.power.movie_ranger.constant.Gender;
import com.power.movie_ranger.constant.Role;
import com.power.movie_ranger.dto.UserJoinDto;
import com.power.movie_ranger.dto.UserUpdateDto;
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

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Wishlist> wishlists = new ArrayList<>();

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

    public void updateUser(UserUpdateDto dto, PasswordEncoder pe, Long loginId){
        if(!this.id.equals(loginId)){
            throw new IllegalArgumentException("수정 권한이 없습니다.");
        }

        if (dto.getName() != null) this.name = dto.getName();
        if (dto.getPassword() != null && !dto.getPassword().isBlank()){
            this.password = pe.encode(dto.getPassword());
        }
        if (dto.getNickName() != null) this.nickName = dto.getNickName();
        if (dto.getGender() != null) this.gender = dto.getGender();
        if (dto.getBirthDate() != null) this.birthDate = dto.getBirthDate();
    }

    public boolean canManage(Review review) {
        if (this.role == Role.ADMIN) return true; // 관리자는 무조건 패스
        return review.getUser().getId().equals(this.id); // 아니면 본인 확인
    }

    public boolean canManage(Inquiry inquiry) {
        if (this.role == Role.ADMIN) return true; // 관리자는 무조건 패스
        return inquiry.getUser().getId().equals(this.id); // 아니면 본인 확인
    }
}
