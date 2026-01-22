'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { withAuth } from '@/components/with-auth';
import { useAuth } from '@/contexts/auth-context';
import { signOut } from '@/lib/auth';
import { useRouter } from 'next/navigation';

function AccountPage() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push('/');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold">My Account</h1>
                <Button onClick={handleLogout} variant="outline">
                    Logout
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Account Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Email</p>
                            <p className="font-medium">{user?.email}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Order History</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">No orders yet</p>
                        <Button className="mt-4" asChild>
                            <a href="/">Start Shopping</a>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default withAuth(AccountPage);
