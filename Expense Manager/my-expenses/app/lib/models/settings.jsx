import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema({
  name: String,
  email: String,
  currency: String,
  language: String,
  emailNotifications: Boolean,
  pushNotifications: Boolean,
  weeklyReports: Boolean,
  monthlyReports: Boolean,
  budgetAlerts: Boolean,
  dataExport: Boolean,
  dataRetention: String,
  twoFactorAuth: Boolean,
  autoBackup: Boolean,
  theme: String,
  primaryColor: String,
  compactMode: Boolean,
  autoSync: Boolean,
  cloudBackup: Boolean,
  monthlyBudget: Number,
  savingsGoal: Number,
  budgetAlertsThreshold: Number,
}, { timestamps: true });

export default mongoose.models.Settings || mongoose.model("Settings", SettingsSchema);
