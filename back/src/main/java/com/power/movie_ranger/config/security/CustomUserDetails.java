package com.power.movie_ranger.config.security;

import com.power.movie_ranger.entity.User;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Getter
public class CustomUserDetails implements UserDetails {

    private final User user; // 엔티티를 직접 들고 있으면 편리합니다.

    public CustomUserDetails(User user) {
        this.user = user;
    }
    public User getUser() {
        return this.user;
    }
    // PK(ID)를 반환하는 메서드 추가!
    public Long getId() {
        return user.getId();
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmail(); // 로그인 시 사용하는 아이디(이메일)
    }

    public String getNickname(){
        return user.getNickName();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(user.getRole().toString()));
    }

    // 아래 설정들은 보통 true로 반환합니다 (필요에 따라 로직 추가 가능)
    @Override public boolean isAccountNonExpired() { return true; }
    @Override public boolean isAccountNonLocked() { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }
    @Override public boolean isEnabled() { return true; }
}
