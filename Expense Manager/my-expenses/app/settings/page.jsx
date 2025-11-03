"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Database, 
  Download, 
  Upload, 
  Trash2, 
  Eye, 
  EyeOff, 
  Moon, 
  Sun, 
  Globe, 
  CreditCard, 
  PieChart, 
  Target,
  RefreshCw,
  Save,
  AlertCircle,
  CheckCircle,
  Info
} from 'lucide-react';

const SettingsPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    // Profile Settings
    name: 'Karan Magham',
    email: 'karanmagham09@gmail.com',
    currency: 'INR',
    language: 'English',
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    weeklyReports: true,
    monthlyReports: true,
    budgetAlerts: true,
    
    // Privacy & Security
    dataExport: true,
    dataRetention: '1 year',
    twoFactorAuth: false,
    autoBackup: true,
    
    // Appearance
    theme: 'light',
    primaryColor: '#10B981',
    compactMode: false,
    
    // Data Management
    autoSync: true,
    cloudBackup: false,
    
    // Budget Settings
    monthlyBudget: 50000,
    savingsGoal: 10000,
    budgetAlertsThreshold: 80
  });

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalSettings, setOriginalSettings] = useState(null);

  useEffect(() => {
    setIsVisible(true);
    loadSettings();
  }, []);

  useEffect(() => {
  const fetchSettings = async () => {
    const res = await fetch("/api/settings", { credentials: "include" });
    const json = await res.json();
    if (json.success && json.data) {
      setSettings(json.data);
    }
  };
  fetchSettings();
}, []);


  // Load settings from localStorage on component mount
  const loadSettings = () => {
    try {
      const savedSettings = localStorage.getItem('moneybrief-settings');
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(parsedSettings);
        setOriginalSettings(parsedSettings);
      } else {
        // Save default settings to localStorage
        saveSettingsToStorage(settings);
        setOriginalSettings(settings);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Save settings to localStorage
  const saveSettingsToStorage = (settingsToSave) => {
    try {
      localStorage.setItem('moneybrief-settings', JSON.stringify(settingsToSave));
      return true;
    } catch (error) {
      console.error('Error saving settings:', error);
      return false;
    }
  };

  // Save settings to API (for future backend integration)
  const saveSettingsToAPI = async (settings) => {
  try {
    const res = await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
      credentials: "include",
    });

    const json = await res.json();
    if (json.success) {
      console.log("✅ Settings saved successfully:", json.data);
    } else {
      console.error("❌ Failed to save settings:", json.error);
    }
  } catch (err) {
    console.error("Error saving settings:", err);
  }
};


  const handleSettingChange = (key, value) => {
    const newSettings = {
      ...settings,
      [key]: value
    };
    
    setSettings(newSettings);
    setHasChanges(true);
    
    // Auto-save certain settings immediately
    const autoSaveKeys = ['theme', 'primaryColor', 'compactMode', 'currency'];
    if (autoSaveKeys.includes(key)) {
      saveSettingsToStorage(newSettings);
      setHasChanges(false);
      setOriginalSettings(newSettings);
      
      // Apply theme changes immediately
      if (key === 'theme') {
        applyTheme(value);
      }
      if (key === 'primaryColor') {
        applyPrimaryColor(value);
      }
    }
  };

  // Apply theme changes to the document
  const applyTheme = (theme) => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      document.body.classList.add('dark:bg-gray-900');
    } else {
      root.classList.remove('dark');
      document.body.classList.remove('dark:bg-gray-900');
    }
  };

  // Apply primary color changes
  const applyPrimaryColor = (color) => {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', color);
  };

  const handleSave = async () => {
    setSaveStatus('saving');
    
    try {
      // Save to localStorage first
      const saved = saveSettingsToStorage(settings);
      
      if (saved) {
        // Try to save to API (optional - for future backend integration)
        try {
          await saveSettingsToAPI(settings);
        } catch (apiError) {
          console.warn('Failed to save to server, but saved locally:', apiError);
        }
        
        setSaveStatus('success');
        setHasChanges(false);
        setOriginalSettings(settings);
        
        // Apply all settings
        applyTheme(settings.theme);
        applyPrimaryColor(settings.primaryColor);
        
        // Show success message
        setTimeout(() => setSaveStatus(null), 2000);
      } else {
        throw new Error('Failed to save settings');
      }
    } catch (error) {
      console.error('Save error:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const handleExportData = async () => {
    try {
      // Get all user data
      const allData = {
        exportDate: new Date().toISOString(),
        version: '1.0',
        settings: settings,
        transactions: [],
        message: "Your MoneyBrief data has been exported successfully!"
      };
      
      // Try to fetch transactions data
      try {
        const response = await fetch('/api/transactions');
        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          allData.transactions = data.data;
        }
      } catch (error) {
        console.warn('Could not fetch transactions for export:', error);
      }
      
      const blob = new Blob([JSON.stringify(allData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `moneybrief-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setSaveStatus('exported');
      setTimeout(() => setSaveStatus(null), 2000);
    } catch (error) {
      console.error('Export error:', error);
      setSaveStatus('export-error');
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const handleResetSettings = () => {
    if (confirm('Are you sure you want to reset all settings to default? This action cannot be undone.')) {
      const defaultSettings = {
        name: 'Karan Magham',
        email: 'karanmagham09@gmail.com',
        currency: 'INR',
        language: 'English',
        emailNotifications: true,
        pushNotifications: true,
        weeklyReports: true,
        monthlyReports: true,
        budgetAlerts: true,
        dataExport: true,
        dataRetention: '1 year',
        twoFactorAuth: false,
        autoBackup: true,
        theme: 'light',
        primaryColor: '#10B981',
        compactMode: false,
        autoSync: true,
        cloudBackup: false,
        monthlyBudget: 50000,
        savingsGoal: 10000,
        budgetAlertsThreshold: 80
      };
      
      setSettings(defaultSettings);
      setHasChanges(true);
      
      // Apply theme changes immediately
      applyTheme(defaultSettings.theme);
      applyPrimaryColor(defaultSettings.primaryColor);
    }
  };

  const handleDeleteAccount = async () => {
    setShowDeleteModal(false);
    
    try {
      // Clear all local data
      localStorage.removeItem('moneybrief-settings');
      localStorage.removeItem('moneybrief-transactions');
      
      // Reset to default settings
      const defaultSettings = {
        name: 'Karan Magham',
        email: 'karanmagham09@gmail.com',
        currency: 'INR',
        language: 'English',
        emailNotifications: true,
        pushNotifications: true,
        weeklyReports: true,
        monthlyReports: true,
        budgetAlerts: true,
        dataExport: true,
        dataRetention: '1 year',
        twoFactorAuth: false,
        autoBackup: true,
        theme: 'light',
        primaryColor: '#10B981',
        compactMode: false,
        autoSync: true,
        cloudBackup: false,
        monthlyBudget: 50000,
        savingsGoal: 10000,
        budgetAlertsThreshold: 80
      };
      
      setSettings(defaultSettings);
      setHasChanges(false);
      setOriginalSettings(defaultSettings);
      
      // Apply default theme
      applyTheme('light');
      applyPrimaryColor('#10B981');
      
      alert('Account data has been cleared. All settings have been reset to default.');
    } catch (error) {
      console.error('Error clearing account data:', error);
      alert('Error clearing account data. Please try again.');
    }
  };

  const settingsTabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'data', label: 'Data Management', icon: Database },
    { id: 'budget', label: 'Budget Settings', icon: Target }
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#ddf7d5] via-white to-[#e6fff5] overflow-y-auto">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#10B981]/10 via-transparent to-[#16d495]/10 animate-pulse"></div>
        
        {/* Header */}
        <div className="sticky top-0 bg-opacity-90 backdrop-blur-md z-10 py-4">
          <div className="max-w-7xl mx-auto px-4">
            <Link 
              href="/settings" 
              className="text-[#10B981] text-4xl font-extrabold px-6 py-3 rounded-xl hover:text-white hover:bg-[#10B981] transition-all duration-300 shadow-lg transform hover:scale-105"
            >
              Settings.
            </Link>
            <div className="w-full h-1 bg-gradient-to-r from-[#10B981] to-[#16d495] mt-4 rounded-full"></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className={`max-w-7xl mx-auto px-4 py-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              App
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#16d495]">
                Settings
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Customize your MoneyBrief experience with personalized settings, privacy controls, and data management options.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <RefreshCw className="w-12 h-12 text-[#10B981] animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading settings...</p>
            </div>
          </div>
        ) : (
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Settings Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-2xl border border-[#10B981]/20 p-6 sticky top-24">
              <h3 className="text-xl font-bold text-[#10B981] mb-6">Settings Categories</h3>
              <div className="space-y-2">
                {settingsTabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'bg-[#10B981] text-white shadow-lg'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-[#10B981]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-2xl border border-[#10B981]/20 p-8">
              {/* Profile Settings */}
              {activeTab === 'profile' && (
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-[#10B981]/10 rounded-xl">
                      <User className="w-8 h-8 text-[#10B981]" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-[#10B981]">Profile Settings</h2>
                      <p className="text-gray-600">Manage your personal information</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={settings.name}
                        onChange={(e) => handleSettingChange('name', e.target.value)}
                        className="w-full px-4 py-3 border border-[#10B981]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        value={settings.email}
                        onChange={(e) => handleSettingChange('email', e.target.value)}
                        className="w-full px-4 py-3 border border-[#10B981]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Currency</label>
                      <select
                        value={settings.currency}
                        onChange={(e) => handleSettingChange('currency', e.target.value)}
                        className="w-full px-4 py-3 border border-[#10B981]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-300"
                      >
                        <option value="INR">Indian Rupee (₹)</option>
                        <option value="USD">US Dollar ($)</option>
                        <option value="EUR">Euro (€)</option>
                        <option value="GBP">British Pound (£)</option>
                      </select>
                    </div>
                    {/* <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Language</label>
                      <select
                        value={settings.language}
                        onChange={(e) => handleSettingChange('language', e.target.value)}
                        className="w-full px-4 py-3 border border-[#10B981]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-300"
                      >
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                      </select>
                    </div> */}
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeTab === 'notifications' && (
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-[#10B981]/10 rounded-xl">
                      <Bell className="w-8 h-8 text-[#10B981]" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-[#10B981]">Notification Settings</h2>
                      <p className="text-gray-600">Control how and when you receive notifications</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {[
                      { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive updates via email' },
                      { key: 'pushNotifications', label: 'Push Notifications', description: 'Get real-time alerts on your device' },
                      { key: 'weeklyReports', label: 'Weekly Reports', description: 'Get a summary of your weekly spending' },
                      { key: 'monthlyReports', label: 'Monthly Reports', description: 'Receive monthly financial summaries' },
                      { key: 'budgetAlerts', label: 'Budget Alerts', description: 'Get notified when approaching budget limits' }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                          <h4 className="font-semibold text-gray-800">{item.label}</h4>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings[item.key]}
                            onChange={(e) => handleSettingChange(item.key, e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#10B981]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#10B981]"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Privacy & Security */}
              {activeTab === 'privacy' && (
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-[#10B981]/10 rounded-xl">
                      <Shield className="w-8 h-8 text-[#10B981]" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-[#10B981]">Privacy & Security</h2>
                      <p className="text-gray-600">Manage your data privacy and security settings</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h4 className="font-semibold text-gray-800">Two-Factor Authentication</h4>
                        <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.twoFactorAuth}
                          onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#10B981]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#10B981]"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h4 className="font-semibold text-gray-800">Auto Backup</h4>
                        <p className="text-sm text-gray-600">Automatically backup your data to cloud storage</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.autoBackup}
                          onChange={(e) => handleSettingChange('autoBackup', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#10B981]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#10B981]"></div>
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Data Retention Period</label>
                      <select
                        value={settings.dataRetention}
                        onChange={(e) => handleSettingChange('dataRetention', e.target.value)}
                        className="w-full px-4 py-3 border border-[#10B981]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-300"
                      >
                        <option value="3 months">3 Months</option>
                        <option value="6 months">6 Months</option>
                        <option value="1 year">1 Year</option>
                        <option value="2 years">2 Years</option>
                        <option value="forever">Forever</option>
                      </select>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={handleExportData}
                        className="flex items-center gap-2 px-6 py-3 bg-[#10B981] text-white rounded-xl hover:bg-[#16d495] transition-all duration-300"
                      >
                        <Download className="w-5 h-5" />
                        Export Data
                      </button>
                      <button
                        onClick={() => setShowDeleteModal(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-300"
                      >
                        <Trash2 className="w-5 h-5" />
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance Settings */}
              {activeTab === 'appearance' && (
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-[#10B981]/10 rounded-xl">
                      <Palette className="w-8 h-8 text-[#10B981]" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-[#10B981]">Appearance</h2>
                      <p className="text-gray-600">Customize the look and feel of your app</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-4">Theme</label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() => handleSettingChange('theme', 'light')}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                            settings.theme === 'light' ? 'border-[#10B981] bg-[#10B981]/10' : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Sun className="w-8 h-8 mx-auto mb-2" />
                          <p className="font-medium">Light</p>
                        </button>
                        <button
                          onClick={() => handleSettingChange('theme', 'dark')}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                            settings.theme === 'dark' ? 'border-[#10B981] bg-[#10B981]/10' : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Moon className="w-8 h-8 mx-auto mb-2" />
                          <p className="font-medium">Dark</p>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-4">Primary Color</label>
                      <div className="grid grid-cols-6 gap-3">
                        {['#10B981', '#3B82F6', '#8B5CF6', '#EF4444', '#F59E0B', '#EC4899'].map((color) => (
                          <button
                            key={color}
                            onClick={() => handleSettingChange('primaryColor', color)}
                            className={`w-12 h-12 rounded-xl border-4 transition-all duration-300 ${
                              settings.primaryColor === color ? 'border-gray-800' : 'border-gray-200 hover:border-gray-300'
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h4 className="font-semibold text-gray-800">Compact Mode</h4>
                        <p className="text-sm text-gray-600">Use smaller spacing and compact layouts</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.compactMode}
                          onChange={(e) => handleSettingChange('compactMode', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#10B981]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#10B981]"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Data Management */}
              {activeTab === 'data' && (
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-[#10B981]/10 rounded-xl">
                      <Database className="w-8 h-8 text-[#10B981]" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-[#10B981]">Data Management</h2>
                      <p className="text-gray-600">Manage your data sync and storage</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h4 className="font-semibold text-gray-800">Auto Sync</h4>
                        <p className="text-sm text-gray-600">Automatically sync data across devices</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.autoSync}
                          onChange={(e) => handleSettingChange('autoSync', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#10B981]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#10B981]"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h4 className="font-semibold text-gray-800">Cloud Backup</h4>
                        <p className="text-sm text-gray-600">Store your data in the cloud for backup</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.cloudBackup}
                          onChange={(e) => handleSettingChange('cloudBackup', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#10B981]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#10B981]"></div>
                      </label>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-blue-800">Data Storage Info</h4>
                          <p className="text-sm text-blue-700 mt-1">
                            Your data is stored securely and encrypted. You can export your data anytime or delete your account permanently.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Budget Settings */}
              {activeTab === 'budget' && (
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-[#10B981]/10 rounded-xl">
                      <Target className="w-8 h-8 text-[#10B981]" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-[#10B981]">Budget Settings</h2>
                      <p className="text-gray-600">Set up your financial goals and budgets</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Monthly Budget (₹)</label>
                      <input
                        type="number"
                        value={settings.monthlyBudget}
                        onChange={(e) => handleSettingChange('monthlyBudget', parseInt(e.target.value))}
                        className="w-full px-4 py-3 border border-[#10B981]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Savings Goal (₹)</label>
                      <input
                        type="number"
                        value={settings.savingsGoal}
                        onChange={(e) => handleSettingChange('savingsGoal', parseInt(e.target.value))}
                        className="w-full px-4 py-3 border border-[#10B981]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-300"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Budget Alert Threshold (%)</label>
                      <input
                        type="range"
                        min="50"
                        max="100"
                        value={settings.budgetAlertsThreshold}
                        onChange={(e) => handleSettingChange('budgetAlertsThreshold', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>50%</span>
                        <span className="font-semibold">{settings.budgetAlertsThreshold}%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {saveStatus === 'saving' && (
                        <>
                          <RefreshCw className="w-5 h-5 text-[#10B981] animate-spin" />
                          <span className="text-[#10B981] font-medium">Saving...</span>
                        </>
                      )}
                      {saveStatus === 'success' && (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-green-600 font-medium">Settings saved!</span>
                        </>
                      )}
                      {saveStatus === 'error' && (
                        <>
                          <AlertCircle className="w-5 h-5 text-red-600" />
                          <span className="text-red-600 font-medium">Save failed!</span>
                        </>
                      )}
                      {saveStatus === 'exported' && (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-green-600 font-medium">Data exported!</span>
                        </>
                      )}
                      {saveStatus === 'export-error' && (
                        <>
                          <AlertCircle className="w-5 h-5 text-red-600" />
                          <span className="text-red-600 font-medium">Export failed!</span>
                        </>
                      )}
                    </div>
                    {hasChanges && !saveStatus && (
                      <span className="text-orange-600 text-sm font-medium">• Unsaved changes</span>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleResetSettings}
                      className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300"
                    >
                      <RefreshCw className="w-5 h-5" />
                      Reset
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={saveStatus === 'saving' || !hasChanges}
                      className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#10B981] to-[#16d495] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Save className="w-5 h-5" />
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-red-100 rounded-xl">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Delete Account</h3>
                <p className="text-gray-600">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete your account? This will permanently remove all your data, transactions, and settings.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-300"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-2xl font-bold text-[#10B981] mb-4">MoneyBrief</div>
          <p className="text-gray-400 mb-6">
            Built with ❤️ using React, Next.js, MongoDB, and Tailwind CSS
          </p>
          <p className="text-sm text-gray-500">
            Made by <span className="text-[#10B981] font-semibold">Karan Magham</span> © 2025
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SettingsPage;