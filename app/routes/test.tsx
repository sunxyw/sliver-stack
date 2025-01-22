import logoImage from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { createFileRoute } from "@tanstack/react-router";
import { LockIcon, UserIcon, UserRoundIcon } from "lucide-react";

export const Route = createFileRoute("/test")({
  component: TestPage,
});

function TestPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-lg px-32 py-16 mx-auto">
        <CardHeader className="p-0">
          <img
            src={logoImage}
            alt="Your Company"
            className="block w-auto h-24 mx-auto mb-16 dark:invert"
          />
          <CardTitle className="text-4xl font-normal text-center">
            登录
          </CardTitle>
        </CardHeader>
        <Separator className="my-6" />
        <CardContent className="p-0">
          <div className="space-y-4">
            <FormItem>
              <Input variant="surface" placeholder="邮箱/手机号/用户名">
                <Input.Icon side="left">
                  <UserRoundIcon />
                </Input.Icon>
              </Input>
            </FormItem>

            <FormItem>
              <Input variant="surface" placeholder="密码" type="password">
                <Input.Icon side="left">
                  <LockIcon />
                </Input.Icon>
              </Input>
            </FormItem>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember-me" />
                <label
                  htmlFor="remember-me"
                  className="text-gray-dim peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  下次自动登录
                </label>
              </div>

              <div>
                <a className="text-blue-normal" href="/auth/forgot-password">
                  忘记密码？
                </a>
              </div>
            </div>

            <div className="pt-4">
              <Button variant="solid" size="lg" className="w-full">
                登录
              </Button>

              <div className="flex pt-2">
                <span className="text-gray-dim">没有账户？</span>
                <a className="text-blue-normal" href="/auth/register">
                  点击注册
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
