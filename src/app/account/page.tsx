import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const mockOrders = [
    { id: 'ST-73852', date: '2023-10-26', status: 'Delivered', total: '$448.99' },
    { id: 'ST-89124', date: '2023-11-15', status: 'Shipped', total: '$179.50' },
    { id: 'ST-91023', date: '2023-11-20', status: 'Processing', total: '$59.99' },
];

export default function AccountPage() {
    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">My Account</h1>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile</CardTitle>
                            <CardDescription>Your personal information.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="text-sm">
                                <p className="font-medium">John Doe</p>
                                <p className="text-muted-foreground">john.doe@example.com</p>
                            </div>
                            <Button variant="outline" className="w-full">Edit Profile</Button>
                        </CardContent>
                    </Card>
                </div>
                <div className="md:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Order History</CardTitle>
                            <CardDescription>View your past orders.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Order ID</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Total</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mockOrders.map(order => (
                                        <TableRow key={order.id}>
                                            <TableCell className="font-medium text-primary">{order.id}</TableCell>
                                            <TableCell>{order.date}</TableCell>
                                            <TableCell>
                                                <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}
                                                    className={order.status === 'Delivered' ? 'bg-green-500/20 text-green-700' : ''}
                                                >{order.status}</Badge>
                                            </TableCell>
                                            <TableCell>{order.total}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
