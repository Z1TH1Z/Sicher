'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { UserRole } from '@/lib/auth';

interface WithAuthProps {
    requiredRole?: UserRole;
    redirectTo?: string;
}

export function withAuth<P extends object>(
    Component: React.ComponentType<P>,
    { requiredRole, redirectTo = '/login' }: WithAuthProps = {}
) {
    return function ProtectedComponent(props: P) {
        const { user, role, loading } = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (!loading) {
                if (!user) {
                    router.push(redirectTo);
                } else if (requiredRole && role !== requiredRole) {
                    // Redirect based on role
                    if (role === 'admin') {
                        router.push('/admin');
                    } else {
                        router.push('/account');
                    }
                }
            }
        }, [user, role, loading, router]);

        if (loading) {
            return (
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                        <p className="mt-4 text-muted-foreground">Loading...</p>
                    </div>
                </div>
            );
        }

        if (!user || (requiredRole && role !== requiredRole)) {
            return null;
        }

        return <Component {...props} />;
    };
}
