# 🚘 Oil Admin Dashboard - CRM+ERP Platform

A comprehensive, modular CRM+ERP platform designed for car service replacement points (PSRP), car service centers (ASC), private mechanics, and B2B companies. The platform improves customer service, transaction accounting, analytics, inventory management, finance, communication automation, and customer interaction.

## ✨ Features

### 🔧 Admin Panel
- **ACC Registration & Management** - Register and manage car service centers
- **Employee Management** - Add, edit, and manage staff members
- **Branch & Post Management** - Organize multiple locations and positions
- **Schedule Management** - Manage appointments and work schedules
- **Service & Product Management** - Configure services and inventory
- **Discounts & Promotions** - Manage customer incentives and bonuses
- **Customer & Order History** - Track customer interactions and orders
- **Review Management** - Monitor and respond to customer feedback
- **Advertising Banners** - Display promotional content to customers

### 📱 Mobile-First Design
- Responsive design that works seamlessly on all devices
- Touch-friendly interface for mobile users
- Optimized navigation for small screens

### 🔐 Authentication & Security
- Secure login and registration system
- Role-based access control (Admin, Manager, Employee)
- JWT token authentication
- Protected routes and API endpoints

## 🛠 Tech Stack

- **Frontend**: Vue.js 3 with Composition API
- **Routing**: Vue Router 4
- **State Management**: Pinia
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Icons**: Heroicons
- **Build Tool**: Vite

## 🚀 Getting Started

### Prerequisites
- Node.js 20.19.0 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd oil-admin-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   - The application is configured to use `http://localhost:8088/api` as the backend
   - Update the API base URL in `src/services/api.js` if needed

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:5173`
   - The application will automatically redirect to `/login` if not authenticated

## 📁 Project Structure

```
src/
├── assets/          # Global styles and assets
├── components/      # Reusable Vue components
├── layouts/         # Layout components (AdminLayout)
├── router/          # Vue Router configuration
├── services/        # API services and HTTP client
├── stores/          # Pinia stores (auth, etc.)
├── views/           # Page components
│   ├── acc/         # ACC management views
│   ├── employees/   # Employee management views
│   ├── branches/    # Branch management views
│   ├── services/    # Service management views
│   ├── products/    # Product management views
│   ├── customers/   # Customer management views
│   ├── orders/      # Order management views
│   ├── reviews/     # Review management views
│   ├── promotions/  # Promotion management views
│   ├── banners/     # Banner management views
│   └── schedule/    # Schedule management views
└── main.js          # Application entry point
```

## 🔌 API Integration

The platform is designed to work with a backend API at `http://localhost:8088/api`. The API service layer includes endpoints for:

- **Authentication**: Login, register, logout, profile
- **ACC Management**: CRUD operations for car service centers
- **Employee Management**: Staff CRUD operations
- **Branch Management**: Location management
- **Service & Product Management**: Inventory and service offerings
- **Customer Management**: Customer database operations
- **Order Management**: Service order processing
- **Review Management**: Customer feedback handling
- **Promotion Management**: Discount and bonus systems
- **Banner Management**: Advertising content
- **Schedule Management**: Appointment scheduling

## 🎨 Customization

### Styling
- Uses Tailwind CSS for consistent, responsive design
- Custom color scheme defined in `tailwind.config.js`
- Component-specific styles in `src/assets/main.css`

### Components
- Modular component architecture for easy customization
- Reusable UI components with consistent styling
- Responsive design patterns for mobile-first approach

## 📱 Mobile Responsiveness

The platform is built with mobile-first design principles:

- **Responsive Grid System**: Adapts to different screen sizes
- **Touch-Friendly Interface**: Optimized for mobile devices
- **Collapsible Sidebar**: Mobile-optimized navigation
- **Flexible Tables**: Responsive data tables
- **Mobile Forms**: Optimized form layouts for small screens

## 🔐 Authentication Flow

1. **Login/Register**: Users authenticate through secure forms
2. **JWT Token**: Authentication token stored in localStorage
3. **Route Protection**: Protected routes require valid authentication
4. **Auto-logout**: Automatic logout on token expiration
5. **Role-based Access**: Different features based on user role

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deployment Options
- **Static Hosting**: Deploy the built files to any static hosting service
- **CDN**: Use a CDN for global distribution
- **Docker**: Containerize the application for easy deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔮 Future Enhancements

- **Real-time Notifications**: WebSocket integration for live updates
- **Advanced Analytics**: Enhanced reporting and data visualization
- **Mobile App**: Native mobile applications
- **Integration APIs**: Third-party service integrations
- **Multi-language Support**: Internationalization features
- **Advanced Scheduling**: Calendar integration and automation

---

**Built with ❤️ for the automotive service industry**
