const bun = @import("bun");
const std = @import("std");
const TaggedPointerUnion = bun.TaggedPointerUnion;

const BuildMessage = @import("./BuildMessage.zig").BuildMessage;
const ResolveMessage = @import("./ResolveMessage.zig").ResolveMessage;

/// TaggedPointerUnion for different error data types that can be attached to ErrorInstance
pub const BunErrorData = TaggedPointerUnion(.{
    BuildMessage,
    ResolveMessage,
});

/// Check if a void* is a BuildMessage
pub export fn Bun__isBuildMessage(ptr: ?*anyopaque) bool {
    if (ptr == null) return false;
    const data = @as(*BunErrorData, @ptrCast(@alignCast(ptr)));
    return data.is(BuildMessage);
}

/// Check if a void* is a ResolveMessage
pub export fn Bun__isResolveMessage(ptr: ?*anyopaque) bool {
    if (ptr == null) return false;
    const data = @as(*BunErrorData, @ptrCast(@alignCast(ptr)));
    return data.is(ResolveMessage);
}

/// Get BuildMessage from tagged pointer (returns null if not a BuildMessage)
pub export fn Bun__getBuildMessage(ptr: ?*anyopaque) ?*BuildMessage {
    if (ptr == null) return null;
    const data = @as(*BunErrorData, @ptrCast(@alignCast(ptr)));
    return data.as(BuildMessage);
}

/// Get ResolveMessage from tagged pointer (returns null if not a ResolveMessage)
pub export fn Bun__getResolveMessage(ptr: ?*anyopaque) ?*ResolveMessage {
    if (ptr == null) return null;
    const data = @as(*BunErrorData, @ptrCast(@alignCast(ptr)));
    return data.as(ResolveMessage);
}

/// Finalize the bunErrorData based on its type
pub export fn Bun__errorInstance__finalize(ptr: ?*anyopaque) void {
    if (ptr == null) return;

    const data = @as(*BunErrorData, @ptrCast(@alignCast(ptr)));

    if (data.is(BuildMessage)) {
        const build_message = data.as(BuildMessage);
        build_message.finalize();
    } else if (data.is(ResolveMessage)) {
        const resolve_message = data.as(ResolveMessage);
        resolve_message.finalize();
    }
}