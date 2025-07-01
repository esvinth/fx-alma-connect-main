import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="fx-container py-8">
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold">Admin Panel</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Admin Statistics */}
              <Card className="p-4">
                <h3 className="font-semibold mb-2">Total Users</h3>
                <p className="text-2xl font-bold">0</p>
              </Card>
              <Card className="p-4">
                <h3 className="font-semibold mb-2">Total Posts</h3>
                <p className="text-2xl font-bold">0</p>
              </Card>
              <Card className="p-4">
                <h3 className="font-semibold mb-2">Active Users</h3>
                <p className="text-2xl font-bold">0</p>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Dashboard;