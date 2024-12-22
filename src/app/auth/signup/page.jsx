"use client";

import { useState } from "react";
import { supabase } from "../../../../lib/supabase";
import { useRouter } from "next/navigation";

const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleEmailSignup = async () => {
        try {
            if (!email || !password) {
                alert("이메일 혹은 패스워드를 입력하지 않았습니다");
                return;
            }
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });
            if (error) throw error;
            router.push("/auth/login");
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="w-[60%] flex gap-4 rounded-lg min-w-[600px] max-w-[800px] bg-gray-100 shadow-2xl h-[500px]">
                <img src="/login-ui.jpg" className="w-[40%] max-w-[300px] h-full" alt="" />

          {/* 로그인 문구 및 로그인 버튼 */}
                <div className="p-4 flex-1 flex flex-col my-4 items-center">
                    <h1
                        style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)", }}
                        className="font-extrabold mb-16 text-6xl text-[#ecc155]">
                        Sign In
                    </h1>

                    <div className="flex flex-col gap-4 w-full">
                        <input
                            value={email} onChange={(e) => setEmail(e.target.value)}
                            className="border-2 shadow-sm rounded-md p-2 font-bold focus:outline-none"
                            type="email" placeholder="Email을 입력해주세요." />
                        <input
                            value={password} onChange={(e) => setPassword(e.target.value)}
                            className="border-2 shadow-sm rounded-md p-2 font-bold focus:outline-none"
                            type="password" placeholder="Password를 입력해주세요." />
                        <div className="flex w-full gap-4 mb-4">
                            <button
                                onClick={()=> router.push("/auth/login")}
                                className="flex-1 text-[#ecc155] hover:scale-105 font-bold bg-white p-2 rounded-md" >
                                로그인 페이지 이동
                            </button>
                        <button
                          onClick={handleEmailSignup}
                                className="flex-1 bg-black hover:scale-105 text-white font-bold rounded-md p-2" >
                                회원가입
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;
