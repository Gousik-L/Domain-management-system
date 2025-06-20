import React, { useState } from 'react';
import { User, Lock, Save } from 'lucide-react';
import { User as UserType } from '../../types/user';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface ProfileFormProps {
  user: UserType;
  onUpdate: (updates: Partial<UserType>) => void;
  onChangePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  user,
  onUpdate,
  onChangePassword,
}) => {
  const [formData, setFormData] = useState(user);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleProfileSave = () => {
    onUpdate(formData);
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    setIsChangingPassword(true);
    try {
      await onChangePassword(passwordData.currentPassword, passwordData.newPassword);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      alert('Password changed successfully');
    } catch (error) {
      alert('Failed to change password');
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Profile Settings</h1>
        <p className="text-gray-600">Manage your account information and security settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-500" />
              <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  value={formData.firstName}
                  onChange={(value) => setFormData({ ...formData, firstName: value })}
                  required
                />
                <Input
                  label="Last Name"
                  value={formData.lastName}
                  onChange={(value) => setFormData({ ...formData, lastName: value })}
                  required
                />
              </div>
              
              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(value) => setFormData({ ...formData, email: value })}
                required
              />
              
              <Input
                label="Phone"
                type="tel"
                value={formData.phone}
                onChange={(value) => setFormData({ ...formData, phone: value })}
              />
              
              <Input
                label="Company"
                value={formData.company || ''}
                onChange={(value) => setFormData({ ...formData, company: value })}
              />
              
              <Button onClick={handleProfileSave} icon={Save} className="w-full">
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Lock className="w-5 h-5 text-gray-500" />
              <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                label="Current Password"
                type="password"
                value={passwordData.currentPassword}
                onChange={(value) => setPasswordData({ ...passwordData, currentPassword: value })}
                required
              />
              
              <Input
                label="New Password"
                type="password"
                value={passwordData.newPassword}
                onChange={(value) => setPasswordData({ ...passwordData, newPassword: value })}
                required
              />
              
              <Input
                label="Confirm New Password"
                type="password"
                value={passwordData.confirmPassword}
                onChange={(value) => setPasswordData({ ...passwordData, confirmPassword: value })}
                required
              />
              
              <Button
                onClick={handlePasswordChange}
                disabled={isChangingPassword || !passwordData.currentPassword || !passwordData.newPassword}
                className="w-full"
              >
                {isChangingPassword ? 'Changing...' : 'Change Password'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Address Information</h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Input
                label="Street Address"
                value={formData.address.street}
                onChange={(value) => setFormData({
                  ...formData,
                  address: { ...formData.address, street: value }
                })}
              />
            </div>
            
            <Input
              label="City"
              value={formData.address.city}
              onChange={(value) => setFormData({
                ...formData,
                address: { ...formData.address, city: value }
              })}
            />
            
            <Input
              label="State/Province"
              value={formData.address.state}
              onChange={(value) => setFormData({
                ...formData,
                address: { ...formData.address, state: value }
              })}
            />
            
            <Input
              label="ZIP/Postal Code"
              value={formData.address.zipCode}
              onChange={(value) => setFormData({
                ...formData,
                address: { ...formData.address, zipCode: value }
              })}
            />
            
            <Input
              label="Country"
              value={formData.address.country}
              onChange={(value) => setFormData({
                ...formData,
                address: { ...formData.address, country: value }
              })}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};