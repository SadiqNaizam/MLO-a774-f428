import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string()
    .min(1, { message: "Password is required." })
    .min(8, { message: "Password must be at least 8 characters long." }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

interface LoginFormProps {
  className?: string;
  onLoginSuccess?: (data: LoginFormValues) => void;
  onNavigateToSignUp?: () => void; 
  onNavigateToForgotPassword?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  className,
  onLoginSuccess,
  onNavigateToSignUp,
  onNavigateToForgotPassword
}) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    
    if (onLoginSuccess) {
      onLoginSuccess(data);
    } else {
      // Placeholder action
      alert(`Login attempt for ${data.email}. Replace with actual logic.`);
    }
    // form.reset(); // Uncomment to reset form on successful submission
  };

  const handleSignUpClick = () => {
    if (onNavigateToSignUp) {
      onNavigateToSignUp();
    } else {
      console.log('Sign up clicked - no navigation handler provided.');
    }
  };

  const handleForgotPasswordClick = () => {
    if (onNavigateToForgotPassword) {
      onNavigateToForgotPassword();
    } else {
      console.log('Forgot password clicked - no navigation handler provided.');
    }
  };

  return (
    <Card className={cn("w-[400px] bg-card shadow-lg rounded-md", className)}>
      <div className="p-8"> {/* Layout Requirement: mainContent.layout includes p-8 */}
        <CardHeader className="p-0 mb-6"> {/* Layout Requirement: mainContent.container gap-6 (achieved by mb-6 and form's space-y-6) */}
          <CardTitle className="text-3xl font-bold text-center text-card-foreground">
            Welcome
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-secondaryText font-medium">Email Address</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="you@example.com" 
                        {...field} 
                        className="bg-card border-input focus:ring-ring placeholder:text-muted-foreground/60 h-11 px-3"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div> {/* Group for Password input and Forgot Password link */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-secondaryText font-medium">Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="••••••••" 
                          {...field} 
                          className="bg-card border-input focus:ring-ring placeholder:text-muted-foreground/60 h-11 px-3"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="w-full text-right mt-2">
                  <Button
                    type="button"
                    variant="link"
                    className="text-sm text-secondaryText hover:text-secondaryText/80 p-0 h-auto font-medium"
                    onClick={handleForgotPasswordClick}
                  >
                    Forgot Password
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading} 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-base font-semibold py-3 rounded-md h-12"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                Don't have an account?{' '}
                <Button
                  type="button"
                  variant="link"
                  className="p-0 h-auto text-sm text-primary hover:text-primary/90 font-semibold underline"
                  onClick={handleSignUpClick}
                >
                  Sign Up
                </Button>
              </p>
            </form>
          </Form>
        </CardContent>
      </div>
    </Card>
  );
};

export default LoginForm;
