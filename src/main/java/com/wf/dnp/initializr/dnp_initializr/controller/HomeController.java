package com.wf.dnp.initializr.dnp_initializr.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    @GetMapping("/home")
    public String simple() {
        return "index";
    }
    @GetMapping("/home2")
    public String simple2() {
        return "index2";
    }
}
