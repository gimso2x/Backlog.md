import type { BacklogConfig } from "../types/index.ts";

export const DEFAULT_MODELS = ["claude-sonnet-5", "claude-opus-5", "gemini-3.8-flash-tiered", "glm-5.3"] as const;

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
