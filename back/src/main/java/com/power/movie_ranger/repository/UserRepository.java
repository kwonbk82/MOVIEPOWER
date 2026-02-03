package com.power.movie_ranger.repository;

import com.power.movie_ranger.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
    //중복검사
    boolean existsByEmail(String email);

    boolean existsByNickName(String nickName);
}
