import type { Product } from '@/lib/types';
import { db } from './firebase';
import { collection, getDocs, doc, getDoc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';

// Static data for fallback/seeding
export const products: Product[] = [
  {
    id: 'st-cam-001',
    name: 'Sentinel 4K AI Camera',
    description: 'Ultra-high-definition 4K security camera with AI-powered person and vehicle detection. Weatherproof and night vision capable.',
    price: 249.99,
    image: 'https://placehold.co/600x600/1a1a2e/e94560?text=4K+Camera',
    category: 'Cameras',
    specs: {
      Resolution: '4K Ultra HD',
      'Field of View': '120°',
      'Night Vision': 'Up to 100ft',
      'Power Source': 'PoE (Power over Ethernet)',
      Weatherproof: 'IP67 Rated',
    },
  },
  {
    id: 'st-lock-002',
    name: 'Aegis Smart Lock Pro',
    description: 'Keyless entry smart lock with fingerprint, keypad, and app access. Features auto-lock and activity logs.',
    price: 199.99,
    image: 'https://placehold.co/600x600/1a1a2e/e94560?text=Smart+Lock',
    category: 'Access Control',
    specs: {
      'Unlock Methods': 'Fingerprint, Code, App, Key',
      'Battery Life': '12 months',
      'Material': 'Zinc Alloy',
      'Compatibility': 'iOS, Android, Alexa',
    },
  },
  {
    id: 'st-alarm-003',
    name: 'Guardian All-in-One Alarm',
    description: 'Comprehensive home security system with door/window sensors, motion detector, and a central hub with a built-in siren.',
    price: 399.00,
    image: 'https://placehold.co/600x600/1a1a2e/e94560?text=Alarm+System',
    category: 'Alarm Systems',
    specs: {
      'Kit Includes': 'Hub, 2x Door Sensors, 1x Motion Sensor',
      'Connectivity': 'Wi-Fi, Cellular Backup',
      'Siren Volume': '105 dB',
      'Monitoring': 'Optional Professional Monitoring',
    },
  },
  {
    id: 'st-dcam-004',
    name: 'Doorbell Vision+',
    description: 'Smart video doorbell with 2K resolution, two-way audio, and package detection. Never miss a visitor.',
    price: 179.50,
    image: 'https://placehold.co/600x600/1a1a2e/e94560?text=Doorbell',
    category: 'Cameras',
    specs: {
      Resolution: '2K QHD',
      'Audio': 'Two-way with Noise Cancellation',
      'Power': 'Wired or Battery',
      Storage: 'Local & Cloud Options',
    },
  },
  {
    id: 'st-safe-005',
    name: 'Fortress Biometric Safe',
    description: 'A heavy-duty steel safe secured by a state-of-the-art biometric fingerprint scanner. Fireproof and waterproof for ultimate protection.',
    price: 499.99,
    image: 'https://placehold.co/600x600/1a1a2e/e94560?text=Safe',
    category: 'Safes',
    specs: {
      'Material': '12-gauge solid steel',
      'Fire Rating': '1 hour at 1700°F',
      'Waterproof': '24 hours in 8ft of water',
      'Capacity': '1.23 cubic feet',
    },
  },
  {
    id: 'st-panel-006',
    name: 'Command Center Touchscreen',
    description: '7-inch touchscreen hub to control all your Sicher Tech devices. Arm/disarm, view cameras, and manage access from one place.',
    price: 299.00,
    image: 'https://placehold.co/600x600/1a1a2e/e94560?text=Control+Panel',
    category: 'Access Control',
    specs: {
      'Screen Size': '7 inches',
      'Resolution': '1024 x 600',
      'Connectivity': 'Wi-Fi, Z-Wave, Bluetooth',
      'Power': 'AC Power with Battery Backup',
    },
  },
  {
    id: 'st-sensor-007',
    name: 'Enviro-Sensor Suite',
    description: 'Monitor your environment with sensors for smoke, carbon monoxide, and water leaks. Get instant alerts on your phone.',
    price: 129.00,
    image: 'https://placehold.co/600x600/1a1a2e/e94560?text=Sensors',
    category: 'Sensors',
    specs: {
      'Sensors': 'Smoke, CO, Water Leak',
      'Connectivity': 'Z-Wave',
      'Battery Life': '5 years',
      'Compatibility': 'Sicher Tech Command Center',
    },
  },
  {
    id: 'st-solar-008',
    name: 'Solar Panel for Cameras',
    description: 'Keep your battery-powered cameras continuously charged with this efficient, weatherproof solar panel.',
    price: 59.99,
    image: 'https://placehold.co/600x600/1a1a2e/e94560?text=Solar+Panel',
    category: 'Accessories',
    specs: {
      'Power Output': '5W',
      'Cable Length': '13ft (4m)',
      'Weatherproof': 'IP65',
      'Compatibility': 'Sentinel Battery Cam, Doorbell Vision+',
    },
  },
  {
    id: 'st-motion-009',
    name: 'ShadowSense Motion Detector',
    description: 'Advanced PIR motion detector with pet immunity up to 85lbs. Perfect for indoor coverage with minimal false alarms.',
    price: 79.99,
    image: 'https://placehold.co/600x600/1a1a2e/e94560?text=Motion+Sensor',
    category: 'Sensors',
    specs: {
      'Detection Range': '35ft',
      'Coverage Angle': '90°',
      'Pet Immunity': 'Up to 85lbs',
      'Battery Life': '3 years',
    },
  },
  {
    id: 'st-nvr-010',
    name: 'Vault NVR 8-Channel',
    description: 'Network Video Recorder with 8 PoE ports, 4TB storage, and remote viewing. Supports up to 4K resolution cameras.',
    price: 549.99,
    image: 'https://placehold.co/600x600/1a1a2e/e94560?text=NVR',
    category: 'Storage',
    specs: {
      'Channels': '8 PoE ports',
      'Storage': '4TB HDD included',
      'Max Resolution': '4K per channel',
      'Remote Access': 'Mobile & Desktop Apps',
    },
  },
  {
    id: 'st-keypad-011',
    name: 'SecureEntry Keypad',
    description: 'Weatherproof wireless keypad for arming/disarming your security system from the garage or outdoor areas.',
    price: 69.99,
    image: 'https://placehold.co/600x600/1a1a2e/e94560?text=Keypad',
    category: 'Access Control',
    specs: {
      'Backlit': 'Yes, LED',
      'Weatherproof': 'IP55',
      'Battery Life': '2 years',
      'Connectivity': 'Encrypted Wireless',
    },
  },
  {
    id: 'st-glass-012',
    name: 'CrystalGuard Glass Break Sensor',
    description: 'Acoustic glass break detector that covers up to 25ft radius. Instantly triggers alarm when glass shattering is detected.',
    price: 49.99,
    image: 'https://placehold.co/600x600/1a1a2e/e94560?text=Glass+Sensor',
    category: 'Sensors',
    specs: {
      'Coverage Radius': '25ft',
      'Detection Method': 'Acoustic',
      'False Alarm Prevention': 'Dual-stage detection',
      'Battery Life': '5 years',
    },
  },
];

export async function getProducts(): Promise<Product[]> {
  // If running on client, use the API route to bypass potential network blocks
  if (typeof window !== 'undefined') {
    try {
      console.log('[getProducts] Client-side detected, fetching from /api/products');
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      if (!data || data.length === 0) {
        console.warn("[getProducts] No products returned from API, using static data");
        return products;
      }
      return data;
    } catch (error) {
      console.warn("[getProducts] Error fetching from API, returning static data:", error);
      return products;
    }
  }

  // If running on server, fetch directly from Firestore
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    if (querySnapshot.empty) {
      console.warn("[getProducts] No products found in Firestore (server), returning static data.");
      return products;
    }
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      // Ensure simple JSON types for Client Components
      return {
        id: data.id,
        name: data.name,
        description: data.description,
        price: data.price,
        image: data.image,
        category: data.category,
        specs: data.specs,
        // Convert any Timestamps if they exist, or omit them if not needed for display
      } as Product;
    });
  } catch (error) {
    console.warn("Error fetching from Firestore (server), returning static data:", error);
    return products;
  }
}

export async function getProductById(id: string): Promise<Product | undefined> {
  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as Product;
    } else {
      return products.find(p => p.id === id);
    }
  } catch (error) {
    console.warn("Error fetching product from Firestore:", error);
    return products.find(p => p.id === id);
  }
}

export async function addProduct(product: Product): Promise<void> {
  // Use API route on client
  if (typeof window !== 'undefined') {
    const { auth } = await import('./firebase');
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User must be logged in to add products');
    }
    const token = await user.getIdToken();

    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to add product: ${response.status}`);
    }
    return;
  }
  // Server-side (if used directly, e.g. seeding)
  const { setDoc, doc } = await import('firebase/firestore');
  await setDoc(doc(db, "products", product.id), product);
}

export async function updateProduct(product: Product): Promise<void> {
  // Use API route on client
  if (typeof window !== 'undefined') {
    const { auth } = await import('./firebase');
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User must be logged in to update products');
    }
    const token = await user.getIdToken();

    const response = await fetch(`/api/products/${product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to update product: ${response.status}`);
    }
    return;
  }
  // Server-side
  const { updateDoc, doc } = await import('firebase/firestore');
  const { id, ...data } = product;
  // @ts-ignore
  await updateDoc(doc(db, "products", id), data);
}

export async function deleteProduct(id: string): Promise<void> {
  // Use API route on client
  if (typeof window !== 'undefined') {
    const { auth } = await import('./firebase');
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User must be logged in to delete products');
    }
    const token = await user.getIdToken();

    const response = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to delete product: ${response.status}`);
    }
    return;
  }
  // Server-side
  const { deleteDoc, doc } = await import('firebase/firestore');
  // @ts-ignore
  await deleteDoc(doc(db, "products", id));
}
