import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, isAdmin } = useAuth();

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Profile</h1>
          <p className="text-gray-600 text-sm">You need to sign in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
            <p className="mt-1 text-sm text-gray-600">
              {isAdmin
                ? 'Administrator account overview.'
                : 'Your personal account information.'}
            </p>
          </div>
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
            {isAdmin ? 'Admin' : 'User'}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Username</p>
              <p className="text-sm font-medium text-gray-900 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2">
                {user.username}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Email</p>
              <p className="text-sm font-medium text-gray-900 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 break-all">
                {user.email}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Role</p>
              <p className="text-sm font-medium text-gray-900 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2">
                {user.roleName}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            This information is loaded from your account using your current sign-in token.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

