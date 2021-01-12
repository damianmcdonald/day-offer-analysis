package com.github.damianmcdonald.offeranalysis.config;

import org.apache.commons.lang3.RandomStringUtils;
import org.fusesource.jansi.AnsiConsole;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

import java.util.Collections;
import java.util.List;
import java.util.Properties;
import java.util.stream.Collectors;

import static org.fusesource.jansi.Ansi.Color.*;
import static org.fusesource.jansi.Ansi.ansi;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig  extends WebSecurityConfigurerAdapter {

    private final static String PASSWORD_SEPERATOR = " ########################################";

    @Value("${user.standard.name}")
    private String userStandardName;

    @Value("${user.standard.password}")
    private String userStandardPassword;

    @Value("${user.admin.name}")
    private String userAdminName;

    @Override
    protected void configure(final HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/logon.html").permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .loginPage("/logon.html")
                .defaultSuccessUrl("/index.html")
                .permitAll()
                .and()
                .logout()
                .logoutSuccessUrl("/logon.html")
                .permitAll();
    }

    @Override
    protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(inMemoryUserDetailsManager());
    }

    @Bean
    public InMemoryUserDetailsManager inMemoryUserDetailsManager() {
        final Properties users = new Properties();

        // add standard user
        users.put(userStandardName,String.format("%s,ROLE_USER,enabled", userStandardPassword));

        // add admin user
        final String adminPassword = generateCommonLangPassword();
        users.put(userAdminName, String.format("%s,ROLE_ACTUATOR,enabled", adminPassword));
        printPasswordToScreen(userAdminName, adminPassword);

        // add all users to in memory user details manager
        return new InMemoryUserDetailsManager(users);
    }

    private void printPasswordToScreen(final String username, final String password) {
        AnsiConsole.systemInstall();
        System.out.println("");
        System.out.println( ansi().fg(YELLOW).a(PASSWORD_SEPERATOR).reset() );
        System.out.println( "" );
        System.out.println( ansi().fg(WHITE).a(String.format("%s password: ", username)).fg(GREEN).a(password).reset() );
        System.out.println( "" );
        System.out.println( ansi().fg(YELLOW).a(PASSWORD_SEPERATOR).reset() );
        System.out.println( "" );
        AnsiConsole.systemUninstall();
    }

    private String generateCommonLangPassword() {
        final String upperCaseLetters = RandomStringUtils.random(2, 65, 90, true, true);
        final String lowerCaseLetters = RandomStringUtils.random(2, 97, 122, true, true);
        final String numbers = RandomStringUtils.randomNumeric(2);
        final String totalChars = RandomStringUtils.randomAlphanumeric(2);
        final String combinedChars = upperCaseLetters.concat(lowerCaseLetters)
                .concat(numbers)
                .concat(totalChars);
        final List<Character> pwdChars = combinedChars.chars()
                .mapToObj(c -> (char) c)
                .collect(Collectors.toList());
        Collections.shuffle(pwdChars);
        return pwdChars.stream()
                .collect(StringBuilder::new, StringBuilder::append, StringBuilder::append)
                .toString();
    }
}
