# ERP Pro - Modern Business Management System

A beautiful, modern ERP (Enterprise Resource Planning) system built with Next.js, React, and Tailwind CSS. This is a frontend mockup showcasing a comprehensive business management interface.

## Features

### 🎨 Modern Design
- Clean, minimalist interface with beautiful Tailwind CSS styling
- Responsive design that works on desktop and mobile
- Dark sidebar with smooth hover animations
- Professional color scheme and typography

### 📊 ERP Modules
- **Customers** - Customer database and relationship management
- **Estimates** - Project quotes and estimates
- **Jobs** - Active job tracking and project management
- **Invoices** - Invoice generation and tracking
- **Inventory** - Stock management and inventory tracking
- **Vendors** - Supplier relationship management
- **Reports** - Business analytics and insights

### 🚀 Technical Stack
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React features
- **Tailwind CSS** - Utility-first CSS framework
- **Headless UI** - Unstyled, accessible UI components
- **Heroicons** - Beautiful hand-crafted SVG icons

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── layout.js          # Root layout with providers
│   ├── page.js            # Main page
│   └── globals.css        # Global styles
├── components/
│   ├── Shell.js           # Main layout shell
│   └── SectionContent.js  # Dynamic section content
└── context/
    └── ui-context.js      # UI state management
```

## Key Components

### Shell Component
The main layout component featuring:
- Collapsible sidebar navigation
- Top navigation bar with search
- User profile dropdown
- Mobile-responsive design
- Notification system

### UI Context
React context for managing:
- Active section state
- Sidebar collapse state
- Mobile menu state

## Customization

### Colors
The design uses a professional color palette defined in `globals.css`:
- Primary: Blue (#3b82f6)
- Sidebar: Dark gray (#1f2937)
- Backgrounds: Light gray (#f9fafb)

### Navigation
Add or modify navigation items in `src/components/Shell.js`:
```javascript
const navigation = [
  { name: 'New Section', icon: YourIcon, href: '/new-section' },
  // ... other items
];
```

## Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Sections
1. Add navigation item to the `navigation` array
2. Create section-specific components
3. Update the routing logic
4. Add any required icons from Heroicons

## Design Philosophy

This ERP system follows modern design principles:
- **Minimalism** - Clean, uncluttered interface
- **Consistency** - Uniform spacing, colors, and typography
- **Accessibility** - WCAG compliant with proper ARIA labels
- **Performance** - Optimized for fast loading and smooth interactions

## Future Enhancements

- Individual module implementations
- Data visualization charts
- Advanced filtering and search
- User role management
- Real-time notifications
- API integration capabilities

## License

This project is a demonstration template for modern ERP systems.