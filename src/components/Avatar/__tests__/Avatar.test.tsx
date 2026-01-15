/**
 * Avatar component tests
 * Tests behavior, not styling
 */

import { describe, it, expect } from "bun:test";
import { render, screen } from "@testing-library/react";
import { Avatar, AvatarGroup } from "../Avatar";

describe("Avatar", () => {
 it("renders with image when src is provided", () => {
  render(<Avatar src="https://example.com/avatar.jpg" alt="User" />);
  const img = screen.getByAltText("User");
  expect(img).not.toBeNull();
  expect(img.getAttribute("src")).toBe("https://example.com/avatar.jpg");
 });

 it("renders fallback text when src is not provided", () => {
  render(<Avatar fallback="John Doe" />);
  expect(screen.getByText("JD")).not.toBeNull();
 });

 it("renders initials from fallback", () => {
  render(<Avatar fallback="Jane Smith" />);
  expect(screen.getByText("JS")).not.toBeNull();
 });

 it("renders single initial for single name", () => {
  render(<Avatar fallback="John" />);
  expect(screen.getByText("J")).not.toBeNull();
 });

 it("renders default icon when no src and no fallback", () => {
  const { container } = render(<Avatar />);
  const svg = container.querySelector("svg");
  expect(svg).not.toBeNull();
 });

 it("renders with different sizes", () => {
  const { rerender, container } = render(<Avatar size="xs" fallback="Test" />);
  let avatar = container.firstChild as HTMLElement;
  expect(avatar.className).toContain("h-6");

  rerender(<Avatar size="sm" fallback="Test" />);
  avatar = container.firstChild as HTMLElement;
  expect(avatar.className).toContain("h-8");

  rerender(<Avatar size="md" fallback="Test" />);
  avatar = container.firstChild as HTMLElement;
  expect(avatar.className).toContain("h-10");

  rerender(<Avatar size="lg" fallback="Test" />);
  avatar = container.firstChild as HTMLElement;
  expect(avatar.className).toContain("h-12");
 });

 it("renders with different shapes", () => {
  const { rerender, container } = render(<Avatar shape="circle" fallback="Test" />);
  let avatar = container.firstChild as HTMLElement;
  expect(avatar.className).toContain("rounded-full");

  rerender(<Avatar shape="square" fallback="Test" />);
  avatar = container.firstChild as HTMLElement;
  expect(avatar.className).toContain("rounded-lg");
 });

 it("renders status indicator", () => {
  const { container, rerender } = render(<Avatar status="online" fallback="Test" />);
  let status = container.querySelector('span[aria-label="Online"]');
  expect(status).not.toBeNull();

  rerender(<Avatar status="offline" fallback="Test" />);
  status = container.querySelector('span[aria-label="Offline"]');
  expect(status).not.toBeNull();

  rerender(<Avatar status="away" fallback="Test" />);
  status = container.querySelector('span[aria-label="Away"]');
  expect(status).not.toBeNull();

  rerender(<Avatar status="busy" fallback="Test" />);
  status = container.querySelector('span[aria-label="Busy"]');
  expect(status).not.toBeNull();
 });

 it("does not render status when status is not provided", () => {
  const { container } = render(<Avatar fallback="Test" />);
  const status = container.querySelector('span[aria-label*="Online"]');
  expect(status).toBeNull();
 });

 it("applies ring when ring is true", () => {
  const { container } = render(<Avatar ring fallback="Test" />);
  const avatar = container.firstChild as HTMLElement;
  expect(avatar.className).toContain("ring-2");
 });

 it("sets aria-label correctly", () => {
  render(<Avatar alt="User Avatar" fallback="John Doe" />);
  const avatar = screen.getByRole("img");
  expect(avatar.getAttribute("aria-label")).toBe("User Avatar");
 });

 it("uses fallback as aria-label when alt is not provided", () => {
  render(<Avatar fallback="John Doe" />);
  const avatar = screen.getByRole("img");
  expect(avatar.getAttribute("aria-label")).toBe("John Doe");
 });
});

describe("AvatarGroup", () => {
 it("renders all avatars when under max", () => {
  render(
   <AvatarGroup max={5}>
    <Avatar fallback="User 1" />
    <Avatar fallback="User 2" />
    <Avatar fallback="User 3" />
   </AvatarGroup>
  );
  expect(screen.getByText("U1")).not.toBeNull();
  expect(screen.getByText("U2")).not.toBeNull();
  expect(screen.getByText("U3")).not.toBeNull();
 });

 it("limits avatars to max and shows remaining count", () => {
  render(
   <AvatarGroup max={2}>
    <Avatar fallback="User 1" />
    <Avatar fallback="User 2" />
    <Avatar fallback="User 3" />
    <Avatar fallback="User 4" />
   </AvatarGroup>
  );
  expect(screen.getByText("U1")).not.toBeNull();
  expect(screen.getByText("U2")).not.toBeNull();
  expect(screen.getByText("+2")).not.toBeNull();
  expect(screen.queryByText("U3")).toBeNull();
  expect(screen.queryByText("U4")).toBeNull();
 });

 it("sets aria-label with total count", () => {
  const { container } = render(
   <AvatarGroup>
    <Avatar fallback="User 1" />
    <Avatar fallback="User 2" />
   </AvatarGroup>
  );
  const group = container.firstChild as HTMLElement;
  expect(group.getAttribute("aria-label")).toBe("Group of 2 avatars");
 });
});

