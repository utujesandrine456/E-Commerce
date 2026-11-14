"""
Spatial Animations Generator
============================
Generates 3D spatial carousel curves, perspective transforms, and animated frames
for the Rome Explorer & Atelier luxury landing page.
"""

import math
import os
from typing import List, Dict, Any

def compute_spatial_3d_transform(
    index: int,
    current_index: int,
    total: int = 6,
    card_spacing: int = 320,
    depth_step: int = 120,
    angle_step: float = 26.0
) -> Dict[str, Any]:
    """
    Calculates the 3D spatial transformation matrix for a carousel card.
    
    Args:
        index: Index of the current card
        current_index: Index of the focused front card
        total: Total number of items
        card_spacing: Horizontal displacement per offset step (pixels)
        depth_step: Depth translation along the Z-axis (pixels)
        angle_step: Rotation around the Y-axis (degrees)
        
    Returns:
        Dict containing x, z, rotate_y, scale, opacity, and levitation_offset.
    """
    diff = index - current_index
    if diff > total / 2:
        diff -= total
    if diff < -total / 2:
        diff += total

    abs_diff = abs(diff)

    if abs_diff == 0:
        return {
            "x": 0,
            "z": 40,
            "rotate_y": 0.0,
            "scale": 1.0,
            "opacity": 1.0,
            "z_index": 30,
            "visible": True,
        }
    elif abs_diff == 1:
        direction = 1 if diff > 0 else -1
        return {
            "x": direction * card_spacing,
            "z": -depth_step,
            "rotate_y": -direction * angle_step,
            "scale": 0.88,
            "opacity": 0.90,
            "z_index": 20,
            "visible": True,
        }
    elif abs_diff == 2:
        direction = 1 if diff > 0 else -1
        return {
            "x": direction * int(card_spacing * 1.7),
            "z": -depth_step * 2.2,
            "rotate_y": -direction * (angle_step * 1.45),
            "scale": 0.74,
            "opacity": 0.65,
            "z_index": 10,
            "visible": True,
        }
    else:
        direction = 1 if diff > 0 else -1
        return {
            "x": direction * int(card_spacing * 2.4),
            "z": -depth_step * 3.5,
            "rotate_y": -direction * (angle_step * 1.8),
            "scale": 0.50,
            "opacity": 0.0,
            "z_index": 0,
            "visible": False,
        }


def compute_levitation_wave(time_seconds: float, amplitude: float = 10.0, frequency_hz: float = 0.25) -> float:
    """
    Generates harmonic zero-gravity levitation offset for spatial UI components.
    """
    return amplitude * math.sin(2.0 * math.pi * frequency_hz * time_seconds)


if __name__ == "__main__":
    print("=" * 60)
    print("Spatial 3D Carousel Geometry & Animation Preview")
    print("=" * 60)
    for idx in range(6):
        transform = compute_spatial_3d_transform(idx, current_index=0, total=6)
        print(f"Card {idx}: X={transform['x']:+4d}px | Z={transform['z']:+4d}px | "
              f"RotateY={transform['rotate_y']:+5.1f}deg | Scale={transform['scale']:.2f} | "
              f"Opacity={transform['opacity']:.2f}")
    print("=" * 60)

