package com.power.movie_ranger.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class MovieController {

    private final String apiKey;

    private final String TMDB_BASE_URL = "https://api.themoviedb.org/3";

    public MovieController(@Value("${VITE_REACT_APP_MOVIE_API_KEY}")String apiKey) {

        // .env 파일 안에 적힌 변수명과 정확히 일치해야 합니다.
        this.apiKey = apiKey;
    }

    // 1. 영화 목록 (Discover)
    @GetMapping("/discover/movie")
    public Object proxyDiscoverMovie(@RequestParam Map<String, String> allParams) {
        String url = TMDB_BASE_URL + "/discover/movie";
        return fetchFromTmdb(url, allParams);
    }

    // 2. 영화 상세 정보
    @GetMapping("/movie/{id}")
    public Object getMovieDetail(@PathVariable String id, @RequestParam Map<String, String> allParams) {
        String url = TMDB_BASE_URL + "/movie/" + id;
        return fetchFromTmdb(url, allParams);
    }

    // 3. 출연진 정보
    @GetMapping("/movie/{id}/credits")
    public Object getMovieCredits(@PathVariable String id, @RequestParam Map<String, String> allParams) {
        String url = TMDB_BASE_URL + "/movie/" + id + "/credits";
        return fetchFromTmdb(url, allParams);
    }

    //4. 인물 정보
    @GetMapping("/person/{id}/movie_credits")
    public Object getPersonCredits(@PathVariable String id, @RequestParam Map<String, String> allParams) {
        String url = TMDB_BASE_URL + "/person/" + id + "/movie_credits";
        return fetchFromTmdb(url, allParams);
    }

//    5. 인물 상세정보
    @GetMapping("/person/{id}")
    public Object getPersonDetail(@PathVariable String id, @RequestParam Map<String, String> allParams) {
        String url = TMDB_BASE_URL + "/person/" + id;
        return fetchFromTmdb(url, allParams);
    }
    // 6. 인기영화 순위
    @GetMapping("/movie/popular")
    public Object getMoviePopular(@RequestParam Map<String, String> allParams) {
        String url = TMDB_BASE_URL + "/movie/popular";
        return fetchFromTmdb(url, allParams);
    }

    //7. 검색관련
    @GetMapping("/search/{type}")
    public Object QuerySearch(@PathVariable String type, @RequestParam Map<String, String> allParams) {
        String url = TMDB_BASE_URL + "/search/" + type;
        return fetchFromTmdb(url, allParams);
    }
    // [공통 배달 메서드]
    private Object fetchFromTmdb(String url, Map<String, String> allParams) {
        System.out.println("★ 현재 apiKey 변수의 값: [" + apiKey + "]");
        RestTemplate restTemplate = new RestTemplate();
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("api_key", apiKey);

        allParams.forEach(builder::queryParam);

        return restTemplate.getForObject(builder.toUriString(), Object.class);
    }
}
