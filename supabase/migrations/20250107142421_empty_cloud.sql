/*
  # Initial Schema Setup

  1. Authentication and Users
    - Extended user profiles table
    - Provider profiles table
    - Service listings table
  
  2. Bookings and Messaging
    - Bookings table
    - Messages table
    - Conversations table
  
  3. Reviews and Ratings
    - Reviews table
    - Provider ratings

  4. Payments and Subscriptions
    - Payment records
    - Subscription plans
    - Provider subscriptions
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "citext";

-- Provider profiles
CREATE TABLE IF NOT EXISTS provider_profiles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name text,
  description text,
  contact_email citext,
  phone text,
  website text,
  location text,
  service_area text[],
  categories text[],
  experience_years integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Service listings
CREATE TABLE IF NOT EXISTS service_listings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_id uuid REFERENCES provider_profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  category text,
  price_type text CHECK (price_type IN ('fixed', 'hourly', 'quote')),
  price decimal,
  location text,
  availability jsonb,
  images text[],
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Conversations
CREATE TABLE IF NOT EXISTS conversations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id uuid REFERENCES auth.users(id),
  provider_id uuid REFERENCES provider_profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Messages
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id uuid REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id uuid REFERENCES auth.users(id),
  content text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Bookings
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id uuid REFERENCES service_listings(id),
  client_id uuid REFERENCES auth.users(id),
  provider_id uuid REFERENCES provider_profiles(id),
  status text CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  date_time timestamptz,
  duration interval,
  price decimal,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Reviews
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id uuid REFERENCES bookings(id),
  client_id uuid REFERENCES auth.users(id),
  provider_id uuid REFERENCES provider_profiles(id),
  rating integer CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now()
);

-- Subscription plans
CREATE TABLE IF NOT EXISTS subscription_plans (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  description text,
  price decimal NOT NULL,
  features jsonb,
  created_at timestamptz DEFAULT now()
);

-- Provider subscriptions
CREATE TABLE IF NOT EXISTS provider_subscriptions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_id uuid REFERENCES provider_profiles(id),
  plan_id uuid REFERENCES subscription_plans(id),
  status text CHECK (status IN ('active', 'cancelled', 'expired')),
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Payments
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id uuid REFERENCES bookings(id),
  amount decimal NOT NULL,
  status text CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  provider_id uuid REFERENCES provider_profiles(id),
  client_id uuid REFERENCES auth.users(id),
  stripe_payment_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE provider_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON provider_profiles FOR SELECT
  USING (true);

CREATE POLICY "Providers can update own profile"
  ON provider_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Public listings are viewable by everyone"
  ON service_listings FOR SELECT
  USING (active = true);

CREATE POLICY "Providers can manage own listings"
  ON service_listings FOR ALL
  USING (auth.uid() IN (
    SELECT user_id FROM provider_profiles WHERE id = provider_id
  ));

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_provider_profiles_updated_at
    BEFORE UPDATE ON provider_profiles
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_service_listings_updated_at
    BEFORE UPDATE ON service_listings
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();