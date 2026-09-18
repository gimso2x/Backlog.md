import type { BacklogConfig } from "../types/index.ts";

export const DEFAULT_MODELS = [
	"glm-5.3-flash",
	"glm-5.3",
	"claude-sonnet-5",
	"claude-opus-5",
	"claude-fable-5-1",
	"gemini-3.8-flash-tiered",
	"gpt-6-astra",
	"gpt-5.6-luna",
	"gpt-5.6-sol",
	"preset:daily",
	"preset:max-quality",
] as const;

type ModelConfig = Pick<BacklogConfig, "models"> | readonly string[] | null | undefined;

function normalizeModelValue(value: string | null | undefined): string | undefined {
	const trimmed = value?.trim();
	return trimmed ? trimmed : undefined;
}

export function getModelValues(configOrModels?: ModelConfig): string[] {
	if (!configOrModels) return [...DEFAULT_MODELS];
	const raw = Array.isArray(configOrModels) ? configOrModels : (configOrModels as BacklogConfig).models;
	if (!raw || raw.length === 0) return [...DEFAULT_MODELS];
	return raw.map((m) => m.trim()).filter(Boolean);
}

export function resolveModelValue(value: string | null | undefined, configOrModels?: ModelConfig): string | undefined {
	const normalized = normalizeModelValue(value);
	if (!normalized) return undefined;
	const options = getModelValues(configOrModels);
	const match = options.find((opt) => opt.toLowerCase() === normalized.toLowerCase());
	return match ?? normalized;
}
