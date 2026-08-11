"use client";

import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import Label from "@/components/atoms/Label/Label";
import { useChangePassword } from "@/lib/hooks/useChangePassword";

const ChangePasswordForm = () => {
  const {
    currentPassword,
    newPassword,
    confirmPassword,
    visibility,
    isPending,
    isFormFilled,
    handleChange,
    handleSubmit,
    togglePasswordVisibility,
  } = useChangePassword();

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-1">
        <h2 className="font-medium text-[#262626]">Change password</h2>
        <p className="text-sm leading-6 text-[#737373]">
          Use at least eight characters and choose a password you do not use
          elsewhere.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="currentPassword" title="Current password" />
        <Input
          id="currentPassword"
          name="currentPassword"
          type={visibility.currentPassword ? "text" : "password"}
          value={currentPassword}
          onChange={handleChange}
          showPassword={visibility.currentPassword ? "text" : "password"}
          onTogglePassword={() =>
            togglePasswordVisibility("currentPassword")
          }
          passwordVisibilityLabel="current password"
          autoComplete="current-password"
          placeholder="Enter current password"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="newPassword" title="New password" />
        <Input
          id="newPassword"
          name="newPassword"
          type={visibility.newPassword ? "text" : "password"}
          value={newPassword}
          onChange={handleChange}
          showPassword={visibility.newPassword ? "text" : "password"}
          onTogglePassword={() => togglePasswordVisibility("newPassword")}
          passwordVisibilityLabel="new password"
          autoComplete="new-password"
          minLength={8}
          placeholder="Enter new password"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword" title="Confirm new password" />
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type={visibility.confirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={handleChange}
          showPassword={visibility.confirmPassword ? "text" : "password"}
          onTogglePassword={() =>
            togglePasswordVisibility("confirmPassword")
          }
          passwordVisibilityLabel="confirmed password"
          autoComplete="new-password"
          minLength={8}
          placeholder="Confirm new password"
          required
        />
      </div>

      <Button
        type="submit"
        width="w-full sm:w-fit"
        loading={isPending}
        loadingLabel="Changing password"
        disabled={!isFormFilled}
      >
        Change password
      </Button>
    </form>
  );
};

export default ChangePasswordForm;
