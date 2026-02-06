package com.power.movie_ranger.controller;

import com.power.movie_ranger.dto.LoginRequestDto;
import com.power.movie_ranger.dto.UserJoinDto;
import com.power.movie_ranger.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/join")
    public ResponseEntity<Long> join(@RequestBody @Valid UserJoinDto dto){
        Long userId = userService.join(dto);
        return ResponseEntity.ok(userId);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDto request
                                    , HttpServletRequest httpRequest){
        try {
            //로그인을 시도하기 위해 토큰을 생성(인증x)
            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(request.getEmail()
                            , request.getPassword());

            //인증을 수행
            //매니저가 토큰을 넘겨받아서 DB에서 조회, 비밀번호를 비교하도록 함
            Authentication authentication = authenticationManager.authenticate(authToken);

            //인증에 성공하면 SecurityContext에 저장 (서버에서 인증된 해당 유저를 기억)
            SecurityContextHolder.getContext().setAuthentication(authentication);

            //인증 정보를 유지할 수 있도록 세션을 생성
            HttpSession session = httpRequest.getSession(true);

            //세션에 저장
            session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());

            //로그인 성공에 대한 정보를 프론트로 전달
            return ResponseEntity.ok().body(Map.of(
                    "message", "로그인 성공",
                    "email", authentication.getName(),    //UserDetails.getUsername()의 리턴값
                    "role", authentication.getAuthorities() //로그인한 사용자의 권한 목록
                            .stream()  //시큐리티는 기본적으로 권한 목록을 객체로 관리
                            //프론트에서 사용하기 쉽도록 객체를 가공할 있도록 해줌
                            .map(a -> a.getAuthority()) //객체에서 문자열을 꺼내어 저장
                            .toList()       //꺼내온 List로 변환하여 전달 List.of("ROLE_USER", "ROLE_ADMIN")
            ));

        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of(
                    "message", "아이디 또는 비밀번호가 틀렸습니다."
            ));
        }
    }
    @GetMapping("/check_email")
    public ResponseEntity<Boolean> checkEmail(@RequestParam("email") String email){
        boolean isDuplicate = userService.checkEmail(email);
        return ResponseEntity.ok(isDuplicate);
    }
    @GetMapping("/check_nickName")
    public ResponseEntity<Boolean> checkNickName(@RequestParam("nickName") String nickName){
        boolean isDuplicate = userService.checkNickName(nickName);
        return ResponseEntity.ok(isDuplicate);
    }
}
